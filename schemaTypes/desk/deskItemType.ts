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
      initialValue: 100,
      validation: (rule) =>
        rule.required().positive().error('Size must be a positive number.'),
    }),

    // The rotation angle in degree of the Desk item
    defineField({
      name: 'rotation',
      title: 'Rotation',
      type: 'number',
      initialValue: 0,
    }),

    // Navigation configuration for the Desk item
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'reference',
      to: [{ type: 'nav-item' }, { type: 'social-link' }],
    }),

    // Active behaviour of the navigable Desk item when interacted (hovered, clicked, etc)
    defineField({
      name: 'interactionEffect',
      title: 'Interaction Effect',
      type: 'string',
      description: 'The effect to apply when the Desk Item is interacted with.',
      initialValue: 'none',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Focus Frame', value: 'focus-frame' },
        ],
      },
      hidden: ({ parent }) => !parent?.navigation,
    }),

    // Focus Frame configuration for the Desk item
    // (ONLY IF interactionEffect is 'focus-frame' and navigation is set)
    defineField({
      name: 'focusFrame',
      title: 'Focus Frame',
      type: 'focus-frame',
      hidden: ({ parent }) =>
        !parent?.navigation || parent?.interactionEffect !== 'focus-frame',
    }),
  ],
});

export default deskItemType;
