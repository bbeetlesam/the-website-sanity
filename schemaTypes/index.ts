import authorType from './blog/authorType';
import blogType from './blog/blogType';
import navItemType from './navigation/navItemType';
import deskItemType from './desk/deskItemType';
import deskType from './desk/deskType';
import socialLinkType from './social/socialLinkType';
import iconType from './objects/iconType';
import typefaceType from './filetype/typefaceType';
import focusFrameType from './objects/focusFrameType';

export const schemaTypes = [
  // Documents
  blogType,
  authorType,
  navItemType,
  deskType,
  socialLinkType,
  typefaceType,

  // Objects
  deskItemType,
  iconType,
  focusFrameType,
];
