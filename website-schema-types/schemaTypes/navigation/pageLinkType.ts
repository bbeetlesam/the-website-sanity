import { defineField, defineType } from 'sanity';

const pageLinkType = defineType({
  name: 'page-link',
  title: 'Page Link',
  type: 'document',

  fields: [
    // A unique identifier for each Page Link
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // Representative title for the Page Link
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // Description of the Page Link (longer 'title')
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // Icon variants for the Page Link
    defineField({
      name: 'icon',
      title: 'Image Icon',
      type: 'icon',
      validation: (rule) => rule.required(),
    }),

    // The order of the Page Link in the navigation menu
    defineField({
      name: 'navOrder',
      title: 'Order',
      description:
        "Order of the Page Link(s) in the frontend's navigation menu.",
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'desc',
      media: 'icon.default',
    },
  },
});

export default pageLinkType;
