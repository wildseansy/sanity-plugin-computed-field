import React from 'react'
import {StringInputProps, set} from 'sanity'
import {ThemeProvider, studioTheme, Container, Card, Flex} from '@sanity/ui'
import {ComputedTextSchemaType} from '../schema/types'
import {useQueryReducer} from '../hooks/useQueryReducer'
import {InputControls} from './InputControls'

export type ComputedTextInputProps = StringInputProps<ComputedTextSchemaType>

export const ComputedTextInput = (props: ComputedTextInputProps) => {
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
    <ThemeProvider theme={studioTheme}>
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
