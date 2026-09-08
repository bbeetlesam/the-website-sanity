import { defineField, defineType } from 'sanity';

const deskType = defineType({
  name: 'desk',
  title: 'Desk',
  type: 'document',

  fields: [
    // Identifier for the Desk
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (rule) => [
        rule.required().error('Desk ID is required, mate.'),
        rule
          // A Desk ID must follow the format d{number}_{number}
          .regex(/^d[1-9]\d*_[1-9]\d*$/, { name: 'Desk ID' })
          .error('Um, Desk ID must follow the format d{number}_{number}.'),
      ],
    }),

    // Size of the Desk
    defineField({
      name: 'size',
      title: 'Size',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'width',
          title: 'Width',
          type: 'number',
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: 'height',
          title: 'Height',
          type: 'number',
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // List of Desk Item(s) placed in Desk
    defineField({
      name: 'deskItems',
      title: 'Desk Items',
      type: 'array',
      of: [{ type: 'desk-item' }],
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'id',
      width: 'size.width',
      height: 'size.height',
    },

    prepare({ title, width, height }) {
      return {
        title,
        subtitle: `${width}x${height}`,
      };
    },
  },
});

export default deskType;
