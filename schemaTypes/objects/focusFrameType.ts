import { defineField, defineType } from 'sanity';

const focusFrameType = defineType({
  name: 'focus-frame',
  title: 'Focus Frame',
  description: 'Focus Frame settings for the Desk Item.',
  type: 'object',
  fields: [
    defineField({
      name: 'size',
      title: 'Size',
      description:
        "The size of the focus frame as a percentage relative to the item's size.",
      type: 'number',
      validation: (rule) =>
        rule.positive().error('Size must be a positive percentage.'),
    }),

    defineField({
      name: 'cornerSize',
      title: 'Corner Size',
      description: "The size of the focus frame's corner.",
      type: 'number',
    }),

    defineField({
      name: 'cornerThickness',
      title: 'Corner Thickness',
      description: "The thickness of the focus frame's corner.",
      type: 'number',
    }),

    defineField({
      name: 'edgeOffset',
      title: 'Edge Offset',
      description:
        'The offset of the focus drawing from the canvas edge of the item.',
      type: 'number',
    }),
  ],
});

export default focusFrameType;
