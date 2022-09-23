import React, { ReactNode, Suspense } from 'react'
import { GridItem, Stack } from '@chakra-ui/react'
import GridLayoutHome from '../../components/GridsHome/GridLayoutHome/GridLayoutHome'

interface Props {
  children: ReactNode
}

export default function SuspenseNewTopPostsHome (props: Props): JSX.Element {
  const { children } = props

  return (
    <Suspense fallback={(
      <Stack spacing={1}>
        <GridLayoutHome columns={3} rows={2}>
          <GridItem>
            <Suspense />
          </GridItem>
          <GridItem>
            <Suspense />
          </GridItem>
          <GridItem>
            <Suspense />
          </GridItem>
          <GridItem>
            <Suspense />
          </GridItem>
          <GridItem>
            <Suspense />
          </GridItem>
          <GridItem>
            <Suspense />
          </GridItem>
        </GridLayoutHome>
        <GridLayoutHome columns={3} rows={2}>
          <GridItem>
            <Suspense />
          </GridItem>
          <GridItem>
            <Suspense />
          </GridItem>
          <GridItem>
            <Suspense />
          </GridItem>
          <GridItem>
            <Suspense />
          </GridItem>
          <GridItem>
            <Suspense />
          </GridItem>
          <GridItem>
            <Suspense />
          </GridItem>
        </GridLayoutHome>
      </Stack>
    )}
    >
      {children}
    </Suspense>
  )
}
