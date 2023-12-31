import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiErrorBoundary } from '../../../../src/components';

import ErrorBoundary from './error_boundary';
const errorBoundarySource = require('!!raw-loader!./error_boundary');
const errorBoundaryHtml = renderToHtml(ErrorBoundary);

export const ErrorBoundaryExample = {
  title: 'Error boundary',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: errorBoundarySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: errorBoundaryHtml,
        },
      ],
      text: (
        <p>
          Use <strong>WuiErrorBoundary</strong> to prevent errors from taking
          down the entire app.
        </p>
      ),
      props: { WuiErrorBoundary },
      demo: <ErrorBoundary />,
    },
  ],
};
