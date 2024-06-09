import {BooleanComponents, defineType} from 'sanity'

import {ComputedBooleanInput} from '../components/ComputedBooleanInput'

export const computedBooleanSchema = defineType({
  title: 'Computed Boolean',
  type: 'boolean',
  name: 'computedBoolean',
  components: {
    input: ComputedBooleanInput as BooleanComponents['input'],
  },
})
