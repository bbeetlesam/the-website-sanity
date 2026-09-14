import { defineField, defineType } from 'sanity';

const navItemType = defineType({
  name: 'nav-item',
  title: 'Navigation Item',
  type: 'document',

  fields: [
    // A unique identifier for each Nav item
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // Representative title for the Nav item
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // Description of the Nav item (longer 'title')
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // Icon variants for the Nav item
    defineField({
      name: 'icon',
      title: 'Image Icon',
      type: 'icon',
      validation: (rule) => rule.required(),
    }),

    // The order of the Nav item in the navigation menu
    defineField({
      name: 'navOrder',
      title: 'Order',
      description: 'Order of the Nav item in the navigation menu.',
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

export default navItemType;
