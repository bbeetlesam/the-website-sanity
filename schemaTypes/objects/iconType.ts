import { defineType, defineField } from 'sanity';

const iconType = defineType({
  name: 'icon',
  title: 'Icon',
  type: 'object',

  fields: [
    defineField({
      name: 'default',
      title: 'Default Variant',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Active Variant',
      type: 'image',
    }),
  ],
});

export default iconType;
