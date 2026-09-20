import authorType from './blog/authorType';
import blogType from './blog/blogType';
import pageLinkType from './navigation/pageLinkType';
import deskItemType from './desk/deskItemType';
import deskType from './desk/deskType';
import externalLinkType from './navigation/externalLinkType';
import iconType from './objects/iconType';
import typefaceType from './filetype/typefaceType';
import focusFrameType from './objects/focusFrameType';
import positionType from './objects/positionType';
import { fontType } from './objects/fontVariantType';

export const schemaTypes = [
  // Documents
  deskType,
  pageLinkType,
  externalLinkType,
  blogType,
  authorType,
  typefaceType,

  // Objects
  deskItemType,
  iconType,
  focusFrameType,
  positionType,
  fontType,
];
