import React from 'react'
import {useClient, useFormValue} from 'sanity'

import {ComputedQueryResult} from '../schema/types'
type ComputedDocumentResult = {
  _id: string
  [s: string]: unknown
}
export const useQueryReducer = <FieldDataType>({
  reduceQueryResult,
  documentQuerySelection,
  handleValueChange,
  value,
}: {
  reduceQueryResult: (result: ComputedQueryResult) => FieldDataType | Promise<FieldDataType>
  handleValueChange: (updatedValue: FieldDataType) => void
  documentQuerySelection: string
  value?: FieldDataType
}): {
  handleRegenerateValue: () => void
  isRegenerating: boolean
} => {
  const [loading, setLoading] = React.useState(false)
  const client = useClient()
  const docId: string = useFormValue(['_id']) as string
  const _type: string = useFormValue(['_type']) as string
  const reducer = React.useCallback(
    (queryResult: ComputedQueryResult) => reduceQueryResult(queryResult),
    [reduceQueryResult],
  )
  const handleRegenerateValue = React.useCallback(async () => {
    const query = `*[_type == '${_type}' && _id == '${docId}' || _id == '${docId.replace(
      'drafts.',
      '',
    )}'] {
      _id,
      ${documentQuerySelection}
     }`
    setLoading(true)

    const items: ComputedDocumentResult[] = await client.fetch(query)
    const draft = items.find(({_id}) => _id.includes('drafts'))
    const published = items.find(({_id}) => !_id.includes('drafts')) as ComputedDocumentResult

    const newValue = await Promise.resolve(reducer({draft, published}))

    if (newValue !== value) {
      handleValueChange(newValue)
    }
    setLoading(false)
  }, [_type, docId, documentQuerySelection, client, reducer, value, handleValueChange])
  return {
    handleRegenerateValue,
    isRegenerating: loading,
  }
}
