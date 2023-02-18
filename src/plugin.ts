import {definePlugin} from 'sanity'
import {computedBooleanSchema} from './schema/computedBoolean'
import {computedTextSchema} from './schema/computedText'
import {computedStringSchema} from './schema/computedString'
import {computedNumberSchema} from './schema/computedNumber'

export interface ComputedFieldPluginConfig {
  /* nothing here yet */
}

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
