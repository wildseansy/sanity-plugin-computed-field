import {defineType, TextComponents} from 'sanity'
import {ComputedTextInput} from '../components/ComputedTextInput'

export const computedStringSchema = defineType({
  title: 'Computed String',
  type: 'string',
  name: 'computedString',
  components: {
    input: ComputedTextInput as TextComponents['input'],
  },
})
