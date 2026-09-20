import { defineField, defineType } from 'sanity';

export const fontType = defineType({
  name: 'font',
  title: 'Font',
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
      initialValue: 400,
      validation: (rule) =>
        rule
          .required()
          .integer()
          .min(100)
          .max(900)
          .custom((value) =>
            (value ?? 0) % 100 === 0
              ? true
              : 'Weight must be a multiple of 100 :3'
          ),
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
      validation: (rule) => rule.required(),
    }),

    /** Font file of the variant */
    defineField({
      name: 'file',
      title: 'Font file',
      type: 'file',
      options: {
        accept: '.woff,.woff2,.ttf,.otf',
      },
      validation: (rule) => rule.required(),
    }),

    /** Font file's type of the variant */
    defineField({
      name: 'format',
      title: 'Font format',
      type: 'string',
      options: {
        list: [
          { title: 'woff', value: 'woff' },
          { title: 'woff2', value: 'woff2' },
          { title: 'ttf', value: 'truetype' },
          { title: 'otf', value: 'opentype' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
