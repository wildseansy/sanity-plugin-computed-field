import {defineType, TextComponents} from 'sanity'
import {ComputedTextInput} from '../components/ComputedTextInput'

export const computedTextSchema = defineType({
  title: 'Computed Text',
  type: 'text',
  name: 'computedText',
  components: {
    input: ComputedTextInput as TextComponents['input'],
  },
})
