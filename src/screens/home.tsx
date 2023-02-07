import React, {useEffect} from 'react'
import {
  Box,
  Divider,
  Link,
  ScrollView,
  Spacer,
  Spinner,
  Text,
  VStack,
} from 'native-base'
import useStoriesStore from '@/store/stories'
import StoryItem from '@/components/story-item'

const Home = () => {
  const {topStories, fetchTopStories, isLoadingTopStories} = useStoriesStore()

  useEffect(() => {
    fetchTopStories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box bgColor="white" h="full" safeArea>
      <Box bgColor="orange.500" p="5">
        <Link href="https://news.ycombinator.com/">
          <Text fontWeight="extrabold">Hacker News</Text>
        </Link>
      </Box>
      {isLoadingTopStories && (
        <Box p="5">
          <Spinner size="lg" color="orange.500" />
        </Box>
      )}
      <ScrollView px="5" showsVerticalScrollIndicator={false}>
        <VStack space="5" divider={<Divider />} pt="5">
          {topStories.map(story => (
            <StoryItem key={`${story.id}`} item={story} />
          ))}
          <Spacer h="50" />
        </VStack>
      </ScrollView>
    </Box>
  )
}

export default Home
