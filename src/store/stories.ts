import {create} from 'zustand'
import axios from 'axios'
import {Story} from '@/models/story'
import {Author} from '@/models/author'

const API = 'https://hacker-news.firebaseio.com/v0/'

interface StoriesState {
  topStories: Story[]
  authors: Map<string, Author> | undefined
  isLoadingTopStories: boolean
}

interface StoriesActions {
  fetchTopStories: () => void
}

const initialValues: StoriesState = {
  topStories: [],
  isLoadingTopStories: false,
  authors: undefined,
}

const useStoriesStore = create<StoriesState & StoriesActions>((set, _get) => ({
  ...initialValues,
  fetchTopStories: async () => {
    set({
      isLoadingTopStories: true,
    })
    try {
      const res = await axios.get<number[]>(API + 'topstories.json')

      let randomStories = []
      while (randomStories.length < 10) {
        let r = Math.floor(Math.random() * res.data.length)
        if (randomStories.includes(res.data[r]) === false) {
          randomStories.push(res.data[r])
        }
      }

      const topRandomStoriesResults = await Promise.all(
        randomStories.map(id => axios.get(API + 'item/' + id + '.json')),
      )

      let topRandomStories = topRandomStoriesResults.reduce(
        (p, n) => [...p, n.data],
        [] as Story[],
      )

      // sort by story points
      topRandomStories = topRandomStories.sort((a, b) => b.score - a.score)

      let authorIds = topRandomStories.reduce(
        (p, n) => [...p, n.by],
        [] as string[],
      )

      // get authors
      const authorsResults = await Promise.all(
        authorIds.map(by => axios.get<Author>(API + 'user/' + by + '.json')),
      )

      const authors = new Map<string, Author>()

      authorsResults.map(author => authors.set(author.data.id, author.data))

      set({
        authors: authors,
        topStories: topRandomStories,
        isLoadingTopStories: false,
      })
    } catch (error) {
      console.log('Error', error)
      set({
        topStories: [],
        isLoadingTopStories: false,
      })
    }
  },
}))

export default useStoriesStore
