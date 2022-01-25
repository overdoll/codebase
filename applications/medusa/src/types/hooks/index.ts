export interface QueryArgumentsVariables {
  [variable: string]: string | number | null
}

export interface QueryArguments {
  options: { fetchKey: number }
  variables: QueryArgumentsVariables
}
