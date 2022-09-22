import { Stack } from '@chakra-ui/react'
import React from 'react'
import HeaderGrid from './HeaderGrid/HeaderGrid'
import PrepareNewTopPostsHome from './PrepareNewTopPostsHome/PrepareNewTopPostsHome'
import GridArchives from './fragments/GridArchives/GridArchives'
import GridContribute from './fragments/GridContribute/GridContribute'
import PrepareHomePosts from './PrepareHomePosts/PrepareHomePosts'

export default function TilesHome (): JSX.Element {
  return (
    <Stack spacing={4}>
      <HeaderGrid />
      <PrepareNewTopPostsHome />
      <GridArchives />
      <GridContribute />
      <PrepareHomePosts />
    </Stack>
  )
}
