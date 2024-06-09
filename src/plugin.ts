import {definePlugin} from 'sanity'

import {computedBooleanSchema} from './schema/computedBoolean'
import {computedNumberSchema} from './schema/computedNumber'
import {computedStringSchema} from './schema/computedString'
import {computedTextSchema} from './schema/computedText'

export interface ComputedFieldPluginConfig {
  /* nothing here yet */
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sanityComputedField = definePlugin<ComputedFieldPluginConfig | void>((config = {}) => {
  return {
    name: 'sanity-plugin-computed-field',
    schema: {
      types: [
        computedBooleanSchema,
        computedStringSchema,
        computedTextSchema,
        computedNumberSchema,
      ],
    },
  }
})
