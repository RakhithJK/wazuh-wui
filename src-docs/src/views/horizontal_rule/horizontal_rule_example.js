import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiHorizontalRule } from '../../../../src/components';

import { horizontalRuleConfig } from './playground';

import HorizontalRule from './horizontal_rule';
const horizontalRuleSource = require('!!raw-loader!./horizontal_rule');
const horizontalRuleHtml = renderToHtml(HorizontalRule);

import HorizontalRuleMargin from './horizontal_rule_margin';
const horizontalRuleMarginSource = require('!!raw-loader!./horizontal_rule_margin');
const horizontalRuleMarginHtml = renderToHtml(HorizontalRuleMargin);

const horizontalRuleSnippet = '<WuiHorizontalRule size="quarter" />';
const horizontalRuleMarginSnippet = '<WuiHorizontalRule margin="xs" />';

export const HorizontalRuleExample = {
  title: 'Horizontal rule',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: horizontalRuleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: horizontalRuleHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiHorizontalRule</strong> can carry a size. By default it
          will be full.
        </p>
      ),
      props: { WuiHorizontalRule },
      snippet: horizontalRuleSnippet,
      demo: <HorizontalRule />,
    },
    {
      title: 'Margins',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: horizontalRuleMarginSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: horizontalRuleMarginHtml,
        },
      ],
      text: (
        <p>
          <strong>WuiHorizontalRule</strong> margins can also be defined.
          Don&rsquo;t forget that margins will collapse against items that
          proceed / follow.
        </p>
      ),
      snippet: horizontalRuleMarginSnippet,
      demo: <HorizontalRuleMargin />,
    },
  ],
  playground: horizontalRuleConfig,
};
