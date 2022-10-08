import { AccordionButton, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { AddPlus, SubtractMinus } from '@//:assets/icons'
import React from 'react'

const QuestionAnswerItem = ({
  question,
  answer
}) => {
  return (
    <AccordionItem mb={2}>
      {({ isExpanded }) => (
        <>
          <AccordionButton pr={5}>
            <Box flex='1' pl={5} pt={1} pb={1} textAlign='left'>
              <Text color='white' fontSize='2xl'>
                {question}
              </Text>
            </Box>
            {isExpanded
              ? (
                <Icon icon={SubtractMinus} w={3} h={3} fill='white' />
                )
              : (
                <Icon icon={AddPlus} w={3} h={3} fill='white' />
                )}
          </AccordionButton>
          <AccordionPanel p={8}>
            <Text color='white' fontSize='xl'>
              {answer}
            </Text>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}

export default QuestionAnswerItem
