import { defineField, defineType } from 'sanity';

const socialLinkType = defineType({
  name: 'social-link',
  title: 'Social Link',
  type: 'document',

  fields: [
    // A unique identifier for the Social Link
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // The href url link for the Social Link
    defineField({
      name: 'href',
      title: 'Href URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https', 'mailto'],
        }),
    }),

    // The title to represents the Social Link
    defineField({
      name: 'title',
      title: 'Link Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // The icon to represents the Social Link
    defineField({
      name: 'icon',
      title: 'Image Icon',
      type: 'icon',
      validation: (rule) => rule.required(),
    }),

    // The order of the Social Link
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

export default socialLinkType;
