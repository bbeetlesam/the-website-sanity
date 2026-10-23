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

    /** Type of the typeface variants (static or variable) */
    defineField({
      name: 'variantsType',
      title: 'Font Variants Type',
      type: 'string',
      options: {
        list: [
          { title: 'Static', value: 'static' },
          { title: 'Variable', value: 'variable' },
        ],
        layout: 'radio',
      },
      initialValue: 'static',
      validation: (rule) => rule.required(),
    }),

    /** Static font variants of the typeface */
    defineField({
      name: 'staticFonts',
      title: 'Static Font Variants',
      type: 'array',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.parent?.variantsType !== 'static') {
            return true;
          }

          if (!value || value.length === 0) {
            return 'At least one static font variant is required.';
          }

          return true;
        }),
      of: [{ type: 'font' }],
      hidden: ({ parent }) => parent?.variantsType !== 'static',
    }),

    /** Variable font variants of the typeface */
    defineField({
      name: 'variableFonts',
      title: 'Variable Font Variants',
      type: 'array',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.parent?.variantsType !== 'variable') {
            return true;
          }

          if (!value || value.length === 0) {
            return 'At least one variable font variant is required.';
          }

          return true;
        }),
      of: [{ type: 'variable-font' }],
      hidden: ({ parent }) => parent?.variantsType !== 'variable',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      staticFonts: 'staticFonts',
      variableFonts: 'variableFonts',
    },

    prepare({ title, staticFonts, variableFonts }) {
      const variantGroups = [
        staticFonts?.length
          ? `Static: ${staticFonts.map((variant: any) => variant.name).join(', ')}`
          : null,

        variableFonts?.length
          ? `Variable: ${variableFonts.map((variant: any) => variant.name).join(', ')}`
          : null,
      ].filter(Boolean);

      return {
        title: `${title}`,
        subtitle: variantGroups.length
          ? variantGroups.join(' | ')
          : 'No variants yet...',
      };
    },
  },
});

export default typefaceType;
