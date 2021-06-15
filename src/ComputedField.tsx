import * as React from 'react'
import {withDocument} from 'part:@sanity/form-builder'
import {
  TextInput,
  Button,
  Box,
  Flex,
  Stack,
  ThemeProvider,
  studioTheme,
  Switch,
  TextArea,
  Spinner,
} from '@sanity/ui'

import {Marker, Path, isValidationErrorMarker, SanityDocument} from '@sanity/types'
import DefaultFormField from 'part:@sanity/components/formfields/default'
// import styles from './ComputedField.css'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'

import client from 'part:@sanity/base/client'
type SanityType = {
  _type?: string
  title: string
  description?: string
  name: string
  options: {
    buttonText?: string
    editable?: boolean
    documentQuerySelection: string
    reduceQueryResult: (queryResult: {[s: string]: any}) => number | string | null
    [s: string]: any
  }
}

export type SanityProps = {
  type: SanityType
  document: SanityDocument
  presence?: string
  readOnly?: boolean
  markers: Marker[]
  value?: unknown
  level?: number
  onFocus: (pathOrEvent?: Path | React.FocusEvent<any>) => void
  onChange: (ev: any) => void
}

const validateConfiguration = (options: SanityType['options']) => {
  const help = 'https://github.com/wildseansy/sanity-plugin-computed-field#readme'
  if (!options) {
    throw new Error(`ComputedField: options required. See ${help}`)
  } else {
    let breakingKey = null
    if (!options.documentQuerySelection) {
      breakingKey = 'documentQuerySelection'
    } else if (!options.reduceQueryResult) {
      breakingKey = 'reduceQueryResult'
    }
    if (breakingKey) {
      throw new Error(`ComputedField: options.${breakingKey} is required. Please follow ${help}`)
    }
  }
}

const ComputedField: React.FC<SanityProps> = React.forwardRef(
  (props: SanityProps, forwardedRef: React.ForwardedRef<HTMLInputElement>) => {
    const {type, level, onFocus, value, markers} = props
    const document = props.document
    const errors = React.useMemo(() => markers.filter(isValidationErrorMarker), [markers])
    const [loading, setLoading] = React.useState(false)
    const {_id, _type}: SanityDocument = document
    const options = props.type.options
    validateConfiguration(options)
    const reducer = React.useCallback(
      (queryResult: {[s: string]: unknown}) => options.reduceQueryResult(queryResult),
      [options.reduceQueryResult]
    )
    const handleChange = React.useCallback(
      (val: any) => {
        let validated = val
        if (type.name === 'number') {
          validated = parseFloat(val)
          if (validated === NaN) {
            validated = undefined
          }
        }
        props.onChange(PatchEvent.from(validated ? set(validated) : unset()))
      },
      [props.onChange, type.name]
    )
    const onChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value),
      [handleChange]
    )
    const generate = React.useCallback(() => {
      const query = `*[_type == '${_type}' && _id == '${_id}' || _id == '${_id.replace(
        'drafts.',
        ''
      )}'] {
        _id,
        ${options.documentQuerySelection}
       }`
      setLoading(true)
      client.fetch(query).then((items: SanityDocument[]) => {
        let record = items.find(({_id}) => _id.includes('drafts'))
        if (!record) {
          // No draft, use the original:
          record = items[0]
        }
        const newValue = reducer(record)

        if (newValue !== value) {
          handleChange(newValue)
        }
        setLoading(false)
      })
    }, [handleChange, reducer, value, _id, _type])
    let TextComponent = type.name === 'text' ? TextArea : TextInput
    return (
      <ThemeProvider theme={studioTheme}>
        <Stack space={1}>
          <DefaultFormField
            label={type.title || type.name}
            level={level}
            description={type.description}
            presence={props.presence}
            markers={props.markers}
          >
            {type.name === 'boolean' ? (
              <Switch
                checked={value}
                disabled={!options.editable}
                ref={forwardedRef}
                onChange={options.editable ? onChange : null}
              />
            ) : (
              <TextComponent
                disabled={!options.editable}
                type={type.name === 'number' ? 'number' : 'text'}
                customValidity={errors.length > 0 ? errors[0].item.message : ''}
                ref={forwardedRef}
                onChange={options.editable ? onChange : null}
                value={value || ''}
              />
            )}
          </DefaultFormField>
          <Flex align="center">
            <Button
              mode="ghost"
              type="button"
              onClick={generate}
              onFocus={onFocus}
              text={options.buttonText || 'Regenerate'}
            />
            {loading && (
              <Box paddingLeft={2}>
                <Spinner muted />
              </Box>
            )}
          </Flex>
        </Stack>
      </ThemeProvider>
    )
  }
)

export default withDocument(ComputedField)
