import React from 'react'
import {NumberInputProps, set} from 'sanity'
import {ThemeProvider, studioTheme, Inline} from '@sanity/ui'
import {ComputedNumberSchemaType} from '../schema/types'
import {useQueryReducer} from '../hooks/useQueryReducer'
import {InputControls} from './InputControls'

export type ComputedNumberInputProps =
  NumberInputProps<ComputedNumberSchemaType>

export const ComputedNumberInput = (props: ComputedNumberInputProps) => {
  const {schemaType, onChange, value} = props
  const {options} = schemaType
  const {
    reduceQueryResult,
    documentQuerySelection,
    buttonText = 'Regenerate',
  } = options

  const handleValueChange = React.useCallback(
    (val: number) => onChange(set(val)),
    [onChange],
  )

  const {isRegenerating, handleRegenerateValue} = useQueryReducer({
    reduceQueryResult,
    documentQuerySelection,
    handleValueChange,
    value,
  })

  return (
    <ThemeProvider theme={studioTheme}>
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
