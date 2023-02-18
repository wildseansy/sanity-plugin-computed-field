import {
  BooleanDefinition,
  BooleanOptions,
  BooleanSchemaType,
  TextDefinition,
  NumberDefinition,
  TextSchemaType,
  NumberSchemaType,
  TextOptions,
  NumberOptions,
} from 'sanity'
export type ComputedDocumentResult = {
  _id: string
  [s: string]: unknown
}

export type ComputedQueryResult = {
  draft?: ComputedDocumentResult
  published: ComputedDocumentResult
}
export type ComputedFieldOptions<FieldType> = {
  buttonText?: string
  documentQuerySelection: string
  reduceQueryResult: (queryResult: ComputedQueryResult) => FieldType
}
/**
 * @public
 */

// Computed Number
export type ComputedNumberOptions = ComputedFieldOptions<number> & NumberOptions
export interface ComputedNumberSchemaType
  extends Omit<NumberSchemaType, 'options'> {
  options: ComputedNumberOptions
}
export interface ComputedNumberDefinition
  extends Omit<NumberDefinition, 'type' | 'options'> {
  type: 'computedNumber'
  options: ComputedNumberOptions
}

// Computed Text
export type ComputedTextOptions = ComputedFieldOptions<string> & TextOptions
export interface ComputedTextSchemaType
  extends Omit<TextSchemaType, 'options'> {
  options: ComputedTextOptions
}
export interface ComputedTextDefinition
  extends Omit<TextDefinition, 'type' | 'options'> {
  type: 'computedText'
  options: ComputedTextOptions
}

// Computed Boolean
export type ComputedBooleanOptions = ComputedFieldOptions<boolean> &
  BooleanOptions
export interface ComputedBooleanSchemaType
  extends Omit<BooleanSchemaType, 'options'> {
  options: ComputedBooleanOptions
}
export interface ComputedBooleanDefinition
  extends Omit<BooleanDefinition, 'type' | 'options'> {
  type: 'computedBoolean'
  options: ComputedBooleanOptions
}

declare module '@sanity/types' {
  // makes types narrow correctly when using defineType/defineField/defineArrayMember
  export interface IntrinsicDefinitions {
    computedBoolean: ComputedBooleanDefinition
    computedText: ComputedTextDefinition
    computedNumber: ComputedNumberDefinition
  }
}
