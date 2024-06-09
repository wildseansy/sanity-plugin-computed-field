import {Card, Flex, ThemeProvider} from '@sanity/ui'
import React from 'react'
import {BooleanInputProps, set} from 'sanity'

import {useQueryReducer} from '../hooks/useQueryReducer'
import {ComputedBooleanSchemaType} from '../schema/types'
import {theme} from '../utils/theme'
import {InputControls} from './InputControls'

export type ComputedBooleanInputProps = BooleanInputProps<ComputedBooleanSchemaType>

export const ComputedBooleanInput: React.FC<ComputedBooleanInputProps> = (props) => {
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
    <ThemeProvider theme={theme}>
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
