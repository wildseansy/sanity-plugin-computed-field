import React from 'react'
import {BooleanInputProps, set} from 'sanity'
import {Card, Flex, Spinner, Button, ThemeProvider, studioTheme} from '@sanity/ui'
import {ComputedBooleanSchemaType} from '../schema/types'
import {useQueryReducer} from '../hooks/useQueryReducer'
import {InputControls} from './InputControls'

export type ComputedBooleanInputProps = BooleanInputProps<ComputedBooleanSchemaType>

export const ComputedBooleanInput = (props: ComputedBooleanInputProps) => {
  const {schemaType, onChange, value} = props
  const {options} = schemaType
  const {reduceQueryResult, documentQuerySelection, buttonText = 'Regenerate'} = options

  const handleValueChange = React.useCallback((val: boolean) => onChange(set(val)), [onChange])

  const {isRegenerating, handleRegenerateValue} = useQueryReducer({
    reduceQueryResult,
    documentQuerySelection,
    handleValueChange,
    value,
  })
  return (
    <ThemeProvider theme={studioTheme}>
      <Flex direction="row" align="center">
        {props.renderDefault(props)}
        <Card marginLeft={[2, 3]}>
          <InputControls
            buttonText={buttonText}
            isLoading={isRegenerating}
            onClickButton={handleRegenerateValue}
          />
        </Card>
      </Flex>
    </ThemeProvider>
  )
}
