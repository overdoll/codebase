import { GridItem, Stack } from '@chakra-ui/react'
import GridLayoutHome from '../GridsHome/GridLayoutHome/GridLayoutHome'

export default function TestGridsHome (): JSX.Element {
  return (
    <Stack overflowX='scroll' spacing={2}>
      <GridLayoutHome columns={3} rows={3}>
        <GridItem colSpan={3} rowSpan={2} bg='gray.700'>roulette</GridItem>
        <GridItem bg='gray.700'>random</GridItem>
        <GridItem bg='gray.700'>search</GridItem>
        <GridItem bg='gray.700'>discover</GridItem>
      </GridLayoutHome>
      <Stack bg='green.300' spacing={1}>
        <GridLayoutHome columns={6} rows={2}>
          <GridItem bg='gray.700'>top post</GridItem>
          <GridItem bg='gray.700'>new post</GridItem>
          <GridItem colSpan={2} bg='gray.700'>top post</GridItem>
          <GridItem bg='gray.700'>top post</GridItem>
          <GridItem bg='gray.700'>new post</GridItem>
          <GridItem colSpan={2} bg='gray.700'>new post</GridItem>
          <GridItem bg='gray.700'>top post</GridItem>
          <GridItem bg='gray.700'>new post</GridItem>
          <GridItem colSpan={2} bg='gray.700'>top post</GridItem>
        </GridLayoutHome>
        <GridLayoutHome columns={6} rows={2}>
          <GridItem bg='gray.700'>category</GridItem>
          <GridItem bg='gray.700'>character</GridItem>
          <GridItem bg='gray.700'>series</GridItem>
          <GridItem bg='gray.700'>category</GridItem>
          <GridItem bg='gray.700'>3d</GridItem>
          <GridItem bg='gray.700'>series</GridItem>
          <GridItem bg='gray.700'>category</GridItem>
          <GridItem bg='gray.700'>furry</GridItem>
          <GridItem bg='gray.700'>category</GridItem>
          <GridItem bg='gray.700'>3d</GridItem>
          <GridItem bg='gray.700'>series</GridItem>
          <GridItem bg='gray.700'>series</GridItem>
        </GridLayoutHome>
      </Stack>
      <Stack spacing={1} bg='purple.300'>
        <GridLayoutHome columns={3} rows={3}>
          <GridItem gridColumn='auto / span 3' bg='gray.700'>gb archive</GridItem>
          <GridItem gridColumn='auto / span 3' bg='gray.700'>aa archive</GridItem>
          <GridItem gridColumn='auto / span 1' bg='gray.700'>top posts</GridItem>
          <GridItem gridColumn='auto / span 2' bg='gray.700'>new posts</GridItem>
        </GridLayoutHome>
        <GridLayoutHome columns={3} rows={2}>
          <GridItem colSpan={2} bg='gray.700'>create account</GridItem>
          <GridItem colSpan={1} bg='gray.700'>post content</GridItem>
          <GridItem colSpan={1} bg='gray.700'>join discord</GridItem>
          <GridItem colSpan={1} bg='gray.700'>follow twitter</GridItem>
          <GridItem colSpan={1} bg='gray.700'>give feedback</GridItem>
        </GridLayoutHome>
      </Stack>
    </Stack>
  )
}
