import { defineField, defineType } from 'sanity';

const externalLinkType = defineType({
  name: 'social-link', // will later changed to 'external-link'
  title: 'External Link',
  type: 'document',

  fields: [
    // A unique identifier for the External Link
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // The href url link for the External Link
    defineField({
      name: 'href',
      title: 'Href URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https', 'mailto'],
        }),
    }),

    // The title to represents the External Link
    defineField({
      name: 'title',
      title: 'Link Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // The icon to represents the External Link
    defineField({
      name: 'icon',
      title: 'Image Icon',
      type: 'icon',
      validation: (rule) => rule.required(),
    }),

    // The order of the External Link
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'id',
      subtitle: 'title',
      media: 'icon.default',
    },
  },
});

export default externalLinkType;
