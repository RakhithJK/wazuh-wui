import React from 'react';
import { WuiBasicTable, WuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './paginated';
const source = require('!!raw-loader!./paginated');
const html = renderToHtml(Table);

export const section = {
  title: 'Adding pagination to a table',
  source: [
    {
      type: GuideSectionTypes.JS,
      code: source,
    },
    {
      type: GuideSectionTypes.HTML,
      code: html,
    },
  ],
  text: (
    <p>
      The following example shows how to configure pagination via the{' '}
      <WuiCode>pagination</WuiCode>
      property.
    </p>
  ),
  components: { WuiBasicTable },
  demo: <Table />,
};
