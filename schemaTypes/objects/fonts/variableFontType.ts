import { defineField, defineType } from 'sanity';

const variableFontType = defineType({
  name: 'variable-font',
  title: 'Variable Font',
  type: 'object',

  fields: [
    /** Name of the variable font */
    defineField({
      name: 'name',
      title: 'Variant Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    /** Min weight of the variable font */
    defineField({
      name: 'minWeight',
      title: 'Min Weight',
      type: 'number',
      initialValue: 100,
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

    /** Max weight of the variable font */
    defineField({
      name: 'maxWeight',
      title: 'Max Weight',
      type: 'number',
      initialValue: 900,
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

    /** Style of the variable font */
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

    /** Font file of the variable font */
    defineField({
      name: 'file',
      title: 'Font file',
      type: 'file',
      options: {
        accept: '.woff,.woff2,.ttf,.otf',
      },
      validation: (rule) => rule.required(),
    }),

    /** Format of the variable font file */
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

export default variableFontType;
