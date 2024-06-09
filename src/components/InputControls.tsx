import {Button, Inline, Spinner} from '@sanity/ui'
import React from 'react'

type Props = {
  isLoading: boolean
  onClickButton: () => void
  buttonText: string
}
export const InputControls: React.FC<Props> = ({buttonText, onClickButton, isLoading}) => {
  return (
    <Inline space={[2, 3]}>
      <Button onClick={onClickButton} title={buttonText} text={buttonText} mode="ghost" />
      {isLoading && <Spinner />}
    </Inline>
  )
}
