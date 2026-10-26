import { defineField, defineType } from 'sanity';

const iconAssetType = defineType({
  name: 'icon-asset',
  title: 'Icon Asset',
  type: 'document',

  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'icon',
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      id: 'id',
      variants: 'variants',
    },
    prepare({ id, variants }) {
      return {
        title: id,
        subtitle: variants.active
          ? 'Default and Active variant.'
          : 'Default variant only.',
        media: variants.default,
      };
    },
  },
});

export default iconAssetType;
