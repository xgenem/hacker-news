import React from 'react'
import {HStack, Link, Text, VStack} from 'native-base'
import {Story} from '@/models/story'
import moment from 'moment'
import {cleanUrl} from '@/helpers/url'
import useStoriesStore from '@/store/stories'

interface NewsItemProp {
  item: Story
}

const NewsItem = ({item}: NewsItemProp) => {
  const authors = useStoriesStore(state => state.authors)
  const link = item.url || `https://news.ycombinator.com/item?id=${item.id}`
  const time = moment(moment.unix(item.time)).fromNow()

  return (
    <Link w="full" href={link}>
      <VStack space="5">
        <HStack space="2">
          <Text numberOfLines={3} flexWrap="wrap">
            {item.title}{' '}
            {item.url && (
              <Text fontSize="xs" color="gray.500">
                ({cleanUrl(item.url)})
              </Text>
            )}
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="xs" fontWeight="light">
            {`${item.score} points | ${time} | by ${item.by} (${
              authors?.get(item.by)?.karma
            } karma score)`}
          </Text>
        </HStack>
      </VStack>
    </Link>
  )
}

export default NewsItem
