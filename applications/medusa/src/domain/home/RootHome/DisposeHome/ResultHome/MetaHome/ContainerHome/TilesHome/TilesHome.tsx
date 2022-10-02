import { Stack } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import HeaderGrid from './HeaderGrid/HeaderGrid'
import PrepareNewTopPostsHome from './PrepareNewTopPostsHome/PrepareNewTopPostsHome'
import GridArchives from './fragments/GridArchives/GridArchives'
import GridContribute from './fragments/GridContribute/GridContribute'
import PrepareHomePosts from './PrepareHomePosts/PrepareHomePosts'

export default function TilesHome (): JSX.Element {
  const memoHeader = useMemo(() => <HeaderGrid />, [])
  const memoArchive = useMemo(() => <GridArchives />, [])
  const memoContribute = useMemo(() => <GridContribute />, [])

  return (
    <Stack spacing={4}>
      {memoHeader}
      <PrepareNewTopPostsHome />
      {memoArchive}
      {memoContribute}
      <PrepareHomePosts />
    </Stack>
  )
}
