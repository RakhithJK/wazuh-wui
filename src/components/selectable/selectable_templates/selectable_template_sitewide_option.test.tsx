/*
 * Copyright 2022 Wazuh Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * NOTICE: THIS FILE HAS BEEN MODIFIED BY WAZUH INC UNDER COMPLIANCE WITH THE APACHE 2.0 LICENSE FROM THE ORIGINAL WORK
 * OF THE COMPANY Elasticsearch B.V.
 *
 * THE FOLLOWING IS THE COPYRIGHT OF THE ORIGINAL DOCUMENT:
 *
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { requiredProps } from '../../../test/required_props';

import {
  WuiSelectableTemplateSitewideOption,
  wuiSelectableTemplateSitewideFormatOptions,
  wuiSelectableTemplateSitewideRenderOptions,
} from './selectable_template_sitewide_option';

const options: WuiSelectableTemplateSitewideOption[] = [
  {
    label: 'Basic data application',
    'data-test-subj': 'test-this',
    avatar: {
      name: 'Default Space',
    },
    meta: [
      {
        text: 'Application',
        type: 'application',
      },
    ],
    url: 'welcome-dashboards',
    ...requiredProps,
  },
  {
    label: 'Platform with deployment highlighted',
    icon: {
      type: 'user',
    },
    meta: [
      {
        text: 'Account',
        type: 'platform',
      },
      {
        text: 'personal-databoard',
        type: 'deployment',
        highlightSearchString: true,
      },
    ],
  },
  {
    label: 'Other metas',
    searchableLabel: 'Totally custom with pink metadata',
    icon: {
      type: 'alert',
      color: 'accent',
    },
    meta: [
      {
        text: 'Article',
        type: 'article',
      },
      {
        text: 'Case',
        type: 'case',
      },
      {
        text: 'Text',
      },
      {
        text: 'I have a custom type',
        type: 'PINK',
      },
    ],
  },
];

describe('WuiSelectableTemplateSitewideOptions', () => {
  const formattedOptions = wuiSelectableTemplateSitewideFormatOptions(options);

  test('different configurations are formatted with wuiSelectableTemplateSitewideFormatOptions()', () => {
    expect(formattedOptions).toMatchSnapshot();
  });

  test('different configurations are rendered with wuiSelectableTemplateSitewideRenderOptions()', () => {
    options.forEach(option => {
      const component = wuiSelectableTemplateSitewideRenderOptions(option, '');

      expect(component).toMatchSnapshot();
    });
  });

  test('different configurations are rendered with wuiSelectableTemplateSitewideRenderOptions() and search text', () => {
    options.forEach(option => {
      const component = wuiSelectableTemplateSitewideRenderOptions(
        option,
        'data'
      );

      expect(component).toMatchSnapshot();
    });
  });
});
