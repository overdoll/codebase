// Generics

export interface ChoiceAnyValues {
  [name: string]: any
}

export type Id = string

export interface Choice<T> {
  id: Id
  values: T
}

export interface Choices<T> {
  [id: string]: T
}

// register function
type OnChangeRegister = () => void

export interface RegisterFunctionReturn {
  isActive: boolean
  onChange: OnChangeRegister
  id: string
}

export type RegisterFunction<T> = (id: Id, values: T) => RegisterFunctionReturn

// return value functions
export type UseChoiceReturnRemoveValue = (id: Id) => void
export type UseChoiceReturnRemoveValues = (ids: Id[]) => void
export type UseChoiceReturnOnChange<T> = (id: Id, values: T) => void
export type UseChoiceReturnClearValues = () => void

// useChoice Hook
export interface UseChoiceProps<T> {
  defaultValues?: Choices<T>
  max?: number | null
  onChange?: (id: Id, values: T) => void
  onRemove?: (id: Id) => void
}

export interface UseChoiceReturn<T> {
  register: RegisterFunction<T>
  values: Choices<T>
  value: Choice<T> | null
  onChange: UseChoiceReturnOnChange<T>
  removeValue: UseChoiceReturnRemoveValue
  removeValues: UseChoiceReturnRemoveValues
  clearValues: UseChoiceReturnClearValues
}
