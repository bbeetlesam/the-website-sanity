import type { DefaultDocumentNodeResolver } from 'sanity/structure';

import DeskPreview from './DeskPreview';
import DeskVisualEditor from './DeskVisualEditor';

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  if (schemaType === 'desk') {
    return S.document().views([
      S.view.form(),

      S.view.component(DeskVisualEditor).title('Visual Editor'),
      S.view.component(DeskPreview).title('Preview'),
    ]);
  }

  return S.document().views([S.view.form()]);
};
