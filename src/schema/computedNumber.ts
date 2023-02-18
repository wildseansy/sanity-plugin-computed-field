import {defineType, NumberComponents} from 'sanity'
import {ComputedNumberInput} from '../components/ComputedNumberInput'

export const computedNumberSchema = defineType({
  title: 'Computed Number',
  type: 'number',
  name: 'computedNumber',
  components: {
    input: ComputedNumberInput as NumberComponents['input'],
  },
})
