import { Flex, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { LoadMoreProps } from '../../ContentSelection/components/LoadMore/LoadMore'
import { LinkTile, LoadMore } from '../../ContentSelection'

interface TableRowBackgroundProps {
  children: ReactNode
}

interface TableRowProps {
  children: ReactNode
  columns: number
}

interface TableRowColumnProps {
  children: ReactNode
  column: number
}

interface TableProps {
  children: ReactNode
}

interface TableBodyLink {
  children: ReactNode
  to: string
}

interface TableBodyBackground {
  children: ReactNode
}

interface TableBodyRowLoadMoreProps extends LoadMoreProps {
  hasNext: boolean
}

export function Table ({ children }: TableProps): JSX.Element {
  return (
    <Stack spacing={1}>
      {children}
    </Stack>
  )
}

export function TableBodyRowBackground ({ children }: TableRowBackgroundProps): JSX.Element {
  return (
    <Flex align='center' h={10} bg='gray.800' borderRadius='base' p={1}>
      {children}
    </Flex>
  )
}

export function TableHeader ({ children }: TableRowBackgroundProps): JSX.Element {
  return (
    <Flex align='center' h={8} borderRadius='base' p={1}>
      {children}
    </Flex>
  )
}

export function TableHeaderRow ({
  children,
  columns = 1
}: TableRowProps): JSX.Element {
  return (
    <Grid w='100%' templateColumns={`repeat(${columns}, 1fr)`} gap={2}>
      {children}
    </Grid>
  )
}

export function TableBodyRow ({
  children,
  columns = 1
}: TableRowProps): JSX.Element {
  return (
    <Grid w='100%' templateColumns={`repeat(${columns}, 1fr)`} gap={2}>
      {children}
    </Grid>
  )
}

export function TableBody ({
  children
}: TableBodyBackground): JSX.Element {
  return (
    <Stack spacing={2}>
      {children}
    </Stack>
  )
}

export function TableBodyColumn ({
  children,
  column = 1
}: TableRowColumnProps): JSX.Element {
  return (
    <GridItem colSpan={column}>
      {children}
    </GridItem>
  )
}

export function TableBodyColumnText ({
  children,
  column = 1
}: TableRowColumnProps): JSX.Element {
  return (
    <GridItem colSpan={column}>
      <Text textAlign='left' isTruncated fontSize='sm'>
        {children}
      </Text>
    </GridItem>
  )
}

export function TableBodyRowLink ({
  children,
  to
}: TableBodyLink): JSX.Element {
  return (
    <LinkTile borderRadius='base' to={to}>
      <TableBodyRowBackground>
        {children}
      </TableBodyRowBackground>
    </LinkTile>
  )
}

export function TableBodyRowLoadMore ({
  hasNext,
  ...rest
}: TableBodyRowLoadMoreProps): JSX.Element {
  return (
    <TableBodyRowBackground>
      <LoadMore
        {...rest}
      />
    </TableBodyRowBackground>
  )
}

export function TableHeaderColumnText ({
  children,
  column = 1
}: TableRowColumnProps): JSX.Element {
  return (
    <GridItem colSpan={column}>
      <Heading
        color='gray.200'
        textAlign='left'
        isTruncated
        fontSize='md'
      >
        {children}
      </Heading>
    </GridItem>
  )
}
