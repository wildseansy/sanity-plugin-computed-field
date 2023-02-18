import React from 'react'
import {Inline, Button, Spinner} from '@sanity/ui'

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
