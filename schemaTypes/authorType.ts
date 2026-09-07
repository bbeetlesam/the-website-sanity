import { defineField, defineType } from 'sanity';

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',

  fields: [
    // The full 'real' name of the Author
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // The nickname of the Author
    defineField({
      name: 'nickname',
      title: 'Nickname',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // The url slug of the Author's page (if any)
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'nickname',
      },
    }),
  ],
});

export default authorType;
