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
      type: 'image',
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
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'x',
          title: 'X',
          type: 'number',
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: 'y',
          title: 'Y',
          type: 'number',
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // The size in pixels of the Desk item
    defineField({
      name: 'size',
      title: 'Size',
      type: 'number',
    }),

    // The rotation angle in degree of the Desk item
    defineField({
      name: 'rotation',
      title: 'Rotation',
      type: 'number',
    }),

    // Focus Frame configuration for the Desk item
    defineField({
      name: 'focusFrame',
      title: 'Focus Frame',
      type: 'object',
      fields: [
        defineField({
          name: 'size',
          title: 'Size',
          type: 'number',
        }),

        defineField({
          name: 'cornerSize',
          title: 'Corner Size',
          type: 'number',
        }),

        defineField({
          name: 'cornerThickness',
          title: 'Corner Thickness',
          type: 'number',
        }),

        defineField({
          name: 'edgeOffset',
          title: 'Edge Offset',
          type: 'number',
        }),
      ],
    }),

    // Navigation configuration for the Desk item
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'reference',
      to: [{ type: 'nav-item' }],
    }),
  ],
});

export default deskItemType;
