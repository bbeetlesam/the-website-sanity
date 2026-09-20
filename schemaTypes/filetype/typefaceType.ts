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
      of: [{ type: 'font' }],
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
