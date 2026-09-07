import { defineField, defineType } from 'sanity';

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',

  fields: [
    // The title of the Blog
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // The url slug of the Blog
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: 'title',
      },
    }),

    // The author of the Blog (single person)
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),

    // The publication date of the Blog
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),

    // The excerpt (short sentence) of the Blog
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: (rule) => rule.required(),
    }),

    // The main content of the Blog
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
  ],
});

export default blogType;
