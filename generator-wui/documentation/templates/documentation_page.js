import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  <%= componentName %>,
} from '../../../../src/components';

import <%= componentExampleName %> from './<%= fileName %>';
const <%= componentExamplePrefix %>Source = require('!!raw-loader!./<%= fileName %>');
const <%= componentExamplePrefix %>Html = renderToHtml(<%= componentExampleName %>);

export const <%= componentExampleName %>Example = {
  title: '<%= componentExampleName %>',
  sections: [{
    title: '<%= componentExampleName %>',
    source: [{
      type: GuideSectionTypes.JS,
      code: <%= componentExamplePrefix %>Source,
    }, {
      type: GuideSectionTypes.HTML,
      code: <%= componentExamplePrefix %>Html,
    }],
    text: (
      <p>
        Description needed: how to use the <strong>Wui<%= componentExampleName %></strong> component.
      </p>
    ),
    props: { <%= componentName %> },
    demo: <<%= componentExampleName %> />,
  }],
};
