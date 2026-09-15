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
          // A Desk ID must follow the format h{number}_{number} or g{h/v}{number}
          // 'h' for Home desk, 'g' for Games desk
          .regex(/^(?:h[1-9]\d*_[1-9]\d*|g[hv][1-9]\d*)$/, { name: 'Desk ID' })
          .error(
            'Um, Desk ID must follow either h{number}_{number} or g{h/v}{number}.'
          ),
      ],
    }),

    // Size of the Desk
    defineField({
      name: 'size',
      title: 'Size',
      type: 'object',
      // Size must match the aspect ratio specified in the Home Desk ID
      validation: (rule) =>
        rule.required().custom((size, context) => {
          if (!size) return true;

          const id = context.document?.id;

          if (typeof id !== 'string') return true;

          // Game desk: no need to validate aspect ratio and size
          if (/^g/.test(id)) return true;

          // Home desk: extract width/height ratio from h{width}_{height}
          const match = /^h([1-9]\d*)_([1-9]\d*)$/.exec(id);

          if (!match) return true;

          const [, idWidth, idHeight] = match;
          const width = size.width;
          const height = size.height;

          if (typeof width !== 'number' || typeof height !== 'number') {
            return true;
          }

          // Compare ratios using cross multiplication.
          if (width * Number(idHeight) !== height * Number(idWidth)) {
            return 'Size must match the aspect ratio specified in the Home Desk ID.';
          }

          return true;
        }),
      fields: [
        defineField({
          name: 'width',
          title: 'Width',
          type: 'number',
          validation: (rule) =>
            rule
              .required()
              .integer()
              .positive()
              .error('Width must be a positive integer.'),
        }),

        defineField({
          name: 'height',
          title: 'Height',
          type: 'number',
          validation: (rule) =>
            rule
              .required()
              .integer()
              .positive()
              .error('Height must be a positive integer.'),
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
