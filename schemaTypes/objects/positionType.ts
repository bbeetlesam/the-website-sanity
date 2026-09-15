import { defineType, defineField } from 'sanity';

const positionType = defineType({
  name: 'position',
  title: 'Position',
  type: 'object',
  validation: (rule) => rule.required(),
  fields: [
    defineField({
      name: 'x',
      title: 'X',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'y',
      title: 'Y',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required(),
    }),
  ],
});

export default positionType;
