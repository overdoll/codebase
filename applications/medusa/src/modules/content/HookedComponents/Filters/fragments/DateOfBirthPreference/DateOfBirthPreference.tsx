import { useState } from 'react'
import { HStack, Select, Stack, Text } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useSequenceContext } from '../../../Sequence'
import { useUpdateEffect } from 'usehooks-ts'
import { useLingui } from '@lingui/react'
import { getDays, getMonths, getYears } from '../../../../../support/getDateList'

export default function DateOfBirthPreference (): JSX.Element {
  const {
    dispatch
  } = useSequenceContext()

  const { i18n } = useLingui()

  const [day, setDay] = useState<number | null>(null)
  const [month, setMonth] = useState<number | null>(null)
  const [year, setYear] = useState<number | null>(null)

  useUpdateEffect(() => {
    if (day != null && month != null && year != null) {
      const date = new Date(year, month, day)

      dispatch({
        type: 'dateOfBirth',
        value: date,
        transform: 'SET'
      })
    } else {
      dispatch({
        type: 'dateOfBirth',
        value: null,
        transform: 'SET'
      })
    }
  }, [day, month, year])

  return (
    <Stack spacing={4}>
      <HStack spacing={2}>
        <Select
          size='md'
          variant='solid'
          onChange={(e) => setMonth(e.target.value !== '' ? e.target.value as unknown as number : null)}
          placeholder={i18n._(t`Month`)}
        >
          {getMonths().map((item) => (
            <option key={item.index} value={item.index}>
              {item.name}
            </option>
          ))}
        </Select>
        <Select
          size='md'
          variant='solid'
          onChange={(e) => setDay(e.target.value !== '' ? e.target.value as unknown as number : null)}
          placeholder={i18n._(t`Day`)}
        >
          {getDays(month).map((item) => (
            <option key={item.index} value={item.index}>
              {item.name}
            </option>
          ))}
        </Select>
        <Select
          size='md'
          variant='solid'
          onChange={(e) => setYear(e.target.value !== '' ? e.target.value as unknown as number : null)}
          placeholder={i18n._(t`Year`)}
        >
          {getYears().map((item) => (
            <option key={item.index} value={item.index}>
              {item.name}
            </option>
          ))}
        </Select>
      </HStack>
      <Text fontSize='sm' color='gray.300'>
        <Trans>
          We won't share this information with anyone
        </Trans>
      </Text>
    </Stack>
  )
}
