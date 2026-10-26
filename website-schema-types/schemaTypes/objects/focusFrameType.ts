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
      initialValue: 100,
      validation: (rule) =>
        rule.positive().error('Size must be a positive percentage.'),
    }),

    defineField({
      name: 'cornerSize',
      title: 'Corner Size',
      description: "The size of the focus frame's corner.",
      type: 'number',
      initialValue: 20,
    }),

    defineField({
      name: 'cornerThickness',
      title: 'Corner Thickness',
      description: "The thickness of the focus frame's corner.",
      type: 'number',
      initialValue: 3,
    }),

    defineField({
      name: 'edgeOffset',
      title: 'Edge Offset',
      description:
        'The offset of the focus drawing from the canvas edge of the item.',
      type: 'number',
      initialValue: 0,
    }),
  ],
});

export default focusFrameType;
