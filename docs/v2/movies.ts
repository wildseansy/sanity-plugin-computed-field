import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'movie',
  title: 'Movie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
    }),
    defineField({
      name: 'screeningCount',
      title: 'Screening Count',
      description: 'Represents the number of screenings of this movie',
      type: 'computedNumber',
      options: {
        buttonText: 'Refresh',
        documentQuerySelection: `
        "screeningCount": count(*[_type == "screening" && references(^._id)])
        `,
        reduceQueryResult: (result: {
          draft?: { screeningCount: number }
          published: { screeningCount: number }
        }) => {
          return result.published.screeningCount
        },
      },
    }),

    defineField({
      name: 'nextScreening',
      title: 'Next Screening',
      description: 'Represents the date of the next or most recent screening',
      type: 'computedString',
      options: {
        documentQuerySelection: `
        "nextScreening": *[_type == "screening" && references(^._id)]  | order(beginAt desc) {
          beginAt
        }[0].beginAt`,
        reduceQueryResult: (result: {
          draft?: { nextScreening: string }
          published: { nextScreening: string }
        }) => {
          const date = new Date(result.published?.nextScreening)

          // Date of next screening
          return date.toDateString()
        },
      },
    }),
    defineField({
      name: 'hasFutureScreening',
      title: 'Has screening in the future',
      description: 'True if there is a screening in the future',
      type: 'computedBoolean',
      readOnly: true,
      options: {
        documentQuerySelection: `
        "nextScreening": *[_type == "screening" && references(^._id)]  | order(beginAt desc) {
          beginAt
        }[0].beginAt`,
        reduceQueryResult: (result: {
          draft?: { nextScreening: string }
          published: { nextScreening: string }
        }) => {
          const date = new Date(result.published?.nextScreening)

          // Date of next screening
          return date.getTime() > Date.now()
        },
      },
    }),

    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'blockContent',
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release date',
      type: 'datetime',
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'releaseDate',
      media: 'poster',
      castName0: 'castMembers.0.person.name',
      castName1: 'castMembers.1.person.name',
    },
    prepare(selection) {
      const year = selection.date && selection.date.split('-')[0]
      const cast = [selection.castName0, selection.castName1]
        .filter(Boolean)
        .join(', ')

      return {
        title: `${selection.title} ${year ? `(${year})` : ''}`,
        date: selection.date,
        subtitle: cast,
        media: selection.media,
      }
    },
  },
})
