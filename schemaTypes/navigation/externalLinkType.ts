import { defineField, defineType } from 'sanity';

const externalLinkType = defineType({
  name: 'social-link', // will later changed to 'external-link'
  title: 'External Link',
  type: 'document',

  fields: [
    // A unique identifier for the External Link
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // The category of the External Link
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Social - Link to a Social Media', value: 'social' },
          { title: "Game - Link to a Game's page", value: 'game' },
        ],
        layout: 'radio',
      },
      initialValue: 'social',
      validation: (rule) => rule.required(),
    }),

    // Whether the Game External Link is featured on the site
    defineField({
      name: 'featured',
      title: 'Featured?',
      description:
        'Feature the Game on the site (Games page for mobile, especially).',
      type: 'boolean',
      hidden: ({ parent }) => parent?.category !== 'game',
      initialValue: false,
    }),

    // The href url link for the External Link
    defineField({
      name: 'href',
      title: 'Href URL',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['http', 'https', 'mailto', 'www'],
        }),
    }),

    // The title to represents the External Link
    defineField({
      name: 'title',
      title: 'Link Title',
      type: 'string',
    }),

    // The description of the External Link
    defineField({
      name: 'desc',
      title: 'Link Description',
      type: 'string',
    }),

    // The icon to represents the External Link
    defineField({
      name: 'icon',
      title: 'Image Icon',
      type: 'icon',
    }),
  ],

  preview: {
    select: {
      id: 'id',
      title: 'title',
      desc: 'desc',
      category: 'category',
      featured: 'featured',
      media: 'icon.default',
    },

    prepare({ title, media, category, desc, featured }) {
      const linkCategory =
        category === 'social' ? 'Social' : category === 'game' ? 'Game' : '';
      const featuredText = featured ? '(F)' : '';

      return {
        title: `[${linkCategory}]${featuredText} ${title}`,
        subtitle: `${desc}`,
        media,
      };
    },
  },
});

export default externalLinkType;
