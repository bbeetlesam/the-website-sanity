import { defineField, defineType } from 'sanity';

const deskItemType = defineType({
  name: 'desk-item',
  title: 'Desk Item',
  type: 'object',

  fields: [
    // A unique identifier for each Desk item
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // Image icon used for the Desk item
    defineField({
      name: 'icon',
      title: 'Image Icon',
      type: 'icon',
      validation: (rule) => rule.required(),
    }),

    // Image alt name for the Desk item's image icon
    defineField({
      name: 'imageAlt',
      title: 'Image Alt',
      type: 'string',
    }),

    // Position (X and Y) of the Desk item
    defineField({
      name: 'position',
      title: 'Position',
      type: 'position',
    }),

    // The size in pixels of the Desk item
    defineField({
      name: 'size',
      title: 'Size',
      type: 'number',
      validation: (rule) =>
        rule.positive().error('Size must be a positive number.'),
    }),

    // The rotation angle in degree of the Desk item
    defineField({
      name: 'rotation',
      title: 'Rotation',
      type: 'number',
    }),

    // Navigation configuration for the Desk item
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'reference',
      to: [{ type: 'nav-item' }],
    }),

    // Focus Frame configuration for the Desk item
    defineField({
      name: 'focusFrame',
      title: 'Focus Frame',
      type: 'focus-frame',
    }),
  ],
});

export default deskItemType;
