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

    // Whether the Game External Link is featured on the mobile site gallery
    defineField({
      name: 'featured',
      title: 'Featured?',
      description:
        'Feature the Game on the site (Games page for mobile, especially).',
      type: 'boolean',
      hidden: ({ parent }) => parent?.category !== 'game',
      initialValue: false,
    }),

    // The genre of the Game External Link
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      hidden: ({ parent }) => parent?.category !== 'game',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.category !== 'game') return true;

          return value ? true : 'This field is required for the game, ok?';
        }),
    }),

    // The platform(s) the Game External Link is supported on
    defineField({
      name: 'platforms',
      title: 'Supported Platform',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Web', value: 'web' },
          { title: 'Windows', value: 'windows' },
          { title: 'Linux', value: 'linux' },
          { title: 'Mac', value: 'mac' },
          { title: 'Android', value: 'android' },
          { title: 'iOS', value: 'ios' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: ['web'],
      hidden: ({ parent }) => parent?.category !== 'game',
      validation: (rule) =>
        rule.custom((value, context) => {
          const category = context.document?.category;

          if (category !== 'game') return true;

          if (!value || value.length === 0) {
            return 'Select at least one supported platform for the game, lur!';
          }

          return true;
        }),
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

    // The screenshot of the game, usually the gameplay or even can be an icon.
    // Mainly used for the Game's card.
    defineField({
      name: 'screenshot',
      title: 'Screenshot',
      description:
        "The screenshot of the game, usually the gameplay or even can be an icon. Mainly used for the Game's card.",
      type: 'image',
      hidden: ({ parent }) => parent?.category !== 'game',
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
