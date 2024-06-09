# sanity-plugin-computed-field

> This is a **Sanity Studio v3** plugin.

This plugin computes a field's value based on other fields or relationships with its document or based on external data. In other words, this field memoizes a value in a document using [GROQ](https://www.sanity.io/docs/query-cheat-sheet) to lookup and custom javascript to compute the value from those GROQ results. See [this post](https://seansy.medium.com/sanity-io-compute-a-field-4a46873ba5b2) for more info on the plugin.

## Installation
### For Sanity v2
Use sanity-plugin-computed-field version `v1.*`. See [v1 docs](https://github.com/wildseansy/sanity-plugin-computed-field/tree/v1.0.2#installation) for configuration of v1 computed field.

```bash
sanity install sanity-plugin-computed-field@^1.0.2
```

### For Sanity v3
Use sanity-plugin-computed-field version 2 or above
```bash
sanity install sanity-plugin-computed-field@^2.0.0
```

### Initialize plugin

In your sanity.config.ts
```typescript
import {sanityComputedField} from 'sanity-plugin-computed-field'

export default defineConfig({
  name: '...',
  title: '...',

  projectId: '...',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),

    // Add this line
    sanityComputedField()
  ],

  schema: {
    types: schemaTypes,
  },
})

```
## Configure


Now you may use the `computedNumber`, `computedText`, `computedString` and `computedBoolean` types.  These are just `number`, `text`, `string`, and `boolean` values under the hood respectively, but you have have them computed automatically via `documentQuerySelection` and `reduceQueryResult`.

`documentQuerySelection` is a groq query with respect to the current document being viewed in Sanity Studio.

```typescript
  defineField({
    name: '...', //Give your sanity field a name, title, description
    title: '...',
    description: '...',
    type: 'computedNumber',
    readOnly: true or false // set to true to disable setting this value manually
    options: {
      buttonText: 'Refresh',
      documentQuerySelection: `
      "numberOfReferences": count(*[references(^._id)])
      `,
      reduceQueryResult: (result: {
        draft?: {numberOfReferences: number}
        published: {numberOfReferences: number}
      }) => {
        // When 'Refresh' button is pressed, this value will be set to result.published.numberOfReferences, from the documentQuerySelection above.
        return result.published.numberOfReferences
      },
    },
  }),
```

#### `options.documentQuerySelection` (required)

Defines the body of the query **on the current document being edited**.  The result is fed into `reduceQueryResult`, containing both the `draft` and `published` versions of the document. `draft` may be `undefined` if no draft exists. This selection is made every time "Regenerate" is clicked.

#### `options.reduceQueryResult` (required)

Returns the value to populate computed field, based on the query result of 'documentQuerySelection'. This function is called every time "Regenerate" is clicked and the GROQ query successfully is made. This function can also return a promise or be `async` if any asynchronous code needs to be run to compute the result.

#### `options.buttonText` (default `"Regenerate"`)

What text should be in button user clicks to recompute the value.

# A Comprehensive Example

See [docs/v2/movies](./docs/v2/movies.ts) for full example.

This uses the movies sanity template for a new project (from `sanity init`), but adds some computed fields to synthesize if/when the next movie screenings are taking place.

<img src="./docs/v2/images/moviesProject.png"/>


# Field Examples

### `type: "computedNumber"`

<img src="./docs/v2/images/computedNumber.png" width="290">

### `type: "computedText"`

<img src="./docs/v2/images/computedText.png" width="290">

### `type: "computedString"`

<img src="./docs/v2/images/computedString.png" width="290">

### `type: "computedBoolean"`

<img src="./docs/v2/images/computedBoolean.png" width="290">

## Contributing
Run the following to develop the plugin
```bash
npm install
npm run link-watch
```

The project uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio) to develop and publish the plugin.
