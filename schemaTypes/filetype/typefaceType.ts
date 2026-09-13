import { defineField, defineType } from 'sanity';

const typefaceType = defineType({
  name: 'typeface',
  title: 'Typeface',
  type: 'document',

  fields: [
    /** Name of the typeface */
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    /** Variants of the typeface */
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [
        {
          type: 'object',
          fields: [
            /** Name of the variant */
            defineField({
              name: 'name',
              title: 'Variant Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),

            /** Weight of the variant */
            defineField({
              name: 'weight',
              title: 'Weight',
              type: 'number',
              validation: (rule) => rule.required().min(100).max(900),
            }),

            /** Style of the variant */
            defineField({
              name: 'style',
              title: 'Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Normal', value: 'normal' },
                  { title: 'Italic', value: 'italic' },
                ],
              },
              initialValue: 'normal',
            }),

            /** Font file of the variant */
            defineField({
              name: 'file',
              title: 'Font File',
              type: 'file',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      variants: 'variants',
    },

    prepare({ title, variants }) {
      return {
        title,
        subtitle:
          variants
            ?.map((variant: { name: string }) => variant.name)
            .join(', ') || 'No variants yet...',
      };
    },
  },
});

export default typefaceType;
