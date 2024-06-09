import {Card, Container, Flex, ThemeProvider} from '@sanity/ui'
import React from 'react'
import {set, StringInputProps} from 'sanity'

import {useQueryReducer} from '../hooks/useQueryReducer'
import {ComputedTextSchemaType} from '../schema/types'
import {theme} from '../utils/theme'
import {InputControls} from './InputControls'
export type ComputedTextInputProps = StringInputProps<ComputedTextSchemaType>

export const ComputedTextInput: React.FC<ComputedTextInputProps> = (props) => {
  const {schemaType, onChange, value} = props
  const {options, type} = schemaType
  const {reduceQueryResult, documentQuerySelection, buttonText = 'Regenerate'} = options

  const handleValueChange = React.useCallback((val: string) => onChange(set(val)), [onChange])

  const {isRegenerating, handleRegenerateValue} = useQueryReducer({
    reduceQueryResult,
    documentQuerySelection,
    handleValueChange,
    value,
  })
  const isString = type?.type?.name === 'string'
  return (
    <ThemeProvider theme={theme}>
      <Flex direction={isString ? 'row' : 'column'}>
        <Container flex={1}>{props.renderDefault(props)}</Container>
        <Card paddingLeft={isString ? 2 : 0} paddingTop={isString ? 0 : 2}>
          <InputControls
            isLoading={isRegenerating}
            onClickButton={handleRegenerateValue}
            buttonText={buttonText}
          />
        </Card>
      </Flex>
    </ThemeProvider>
  )
}
