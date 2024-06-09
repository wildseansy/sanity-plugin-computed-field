import {Inline, ThemeProvider} from '@sanity/ui'
import React from 'react'
import {NumberInputProps, set} from 'sanity'

import {useQueryReducer} from '../hooks/useQueryReducer'
import {ComputedNumberSchemaType} from '../schema/types'
import {theme} from '../utils/theme'
import {InputControls} from './InputControls'

export type ComputedNumberInputProps = NumberInputProps<ComputedNumberSchemaType>

export const ComputedNumberInput: React.FC<ComputedNumberInputProps> = (props) => {
  const {schemaType, onChange, value} = props
  const {options} = schemaType
  const {reduceQueryResult, documentQuerySelection, buttonText = 'Regenerate'} = options

  const handleValueChange = React.useCallback((val: number) => onChange(set(val)), [onChange])

  const {isRegenerating, handleRegenerateValue} = useQueryReducer({
    reduceQueryResult,
    documentQuerySelection,
    handleValueChange,
    value,
  })

  return (
    <ThemeProvider theme={theme}>
      <Inline space={[2]}>
        {props.renderDefault(props)}
        <InputControls
          isLoading={isRegenerating}
          onClickButton={handleRegenerateValue}
          buttonText={buttonText}
        />
      </Inline>
    </ThemeProvider>
  )
}
