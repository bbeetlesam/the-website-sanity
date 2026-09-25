import { defineField, defineType } from 'sanity';

const staticFontType = defineType({
  name: 'font',
  title: 'Font',
  type: 'object',

  fields: [
    /** Name of the static font */
    defineField({
      name: 'name',
      title: 'Variant Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    /** Weight of the static font */
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

    /** Style of the static font */
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Italic', value: 'italic' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'normal',
      validation: (rule) => rule.required(),
    }),

    /** Font file of the static font */
    defineField({
      name: 'file',
      title: 'Font file',
      type: 'file',
      options: {
        accept: '.woff,.woff2,.ttf,.otf',
      },
      validation: (rule) => rule.required(),
    }),

    /** Format of the static font file */
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
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
  ],
});

export default staticFontType;
