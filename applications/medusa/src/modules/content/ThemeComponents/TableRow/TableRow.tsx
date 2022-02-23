import { Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

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

export function TableRowBackground ({ children }: TableRowBackgroundProps): JSX.Element {
  return (
    <Flex align='center' h={8} bg='gray.800' borderRadius='base' p={1}>
      {children}
    </Flex>
  )
}

export function TableRow ({
  children,
  columns = 1
}: TableRowProps): JSX.Element {
  return (
    <Grid w='100%' templateColumns={`repeat(${columns}, 1fr)`} gap={2}>
      {children}
    </Grid>
  )
}

export function TableRowColumn ({
  children,
  column = 1
}: TableRowColumnProps): JSX.Element {
  return (
    <GridItem colSpan={column}>
      {children}
    </GridItem>
  )
}

export function TableRowColumnText ({
  children,
  column = 1
}: TableRowColumnProps): JSX.Element {
  return (
    <GridItem colSpan={column}>
      <Text textAlign='left' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' fontSize='sm'>
        {children}
      </Text>
    </GridItem>
  )
}

export function TableRowHeaderText ({
  children,
  column = 1
}: TableRowColumnProps): JSX.Element {
  return (
    <GridItem colSpan={column}>
      <Heading
        color='gray.00'
        textAlign='left'
        whiteSpace='nowrap'
        textOverflow='ellipsis'
        overflow='hidden'
        fontSize='sm'
      >
        {children}
      </Heading>
    </GridItem>
  )
}
