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

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { WuiHeader } from './header';

describe('WuiHeader', () => {
  test('is rendered', () => {
    const component = render(<WuiHeader {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders children', () => {
    const component = render(
      <WuiHeader>
        <span>Hello!</span>
      </WuiHeader>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders in fixed position', () => {
    const component = render(
      <WuiHeader position="fixed">
        <span>Hello!</span>
      </WuiHeader>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders dark theme', () => {
    const component = render(<WuiHeader theme="dark" />);

    expect(component).toMatchSnapshot();
  });

  describe('sections', () => {
    test('render simple items and borders', () => {
      const component = render(
        <WuiHeader
          sections={[
            {
              items: ['Item 1', 'Item 2'],
              borders: 'right',
            },
            {
              items: ['Item A', 'Item B'],
            },
          ]}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('render breadcrumbs and props', () => {
      const component = render(
        <WuiHeader
          sections={[
            {
              breadcrumbs: [{ text: 'Breadcrumb' }],
              breadcrumbProps: { responsive: false },
            },
          ]}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('throws a warning', () => {
    const oldConsoleError = console.warn;
    let consoleStub: jest.Mock;

    beforeEach(() => {
      // We don't use jest.spyOn() here, because WUI's tests apply a global
      // console.error() override that throws an exception. For these
      // tests, we just want to know if console.error() was called.
      console.warn = consoleStub = jest.fn();
    });

    afterEach(() => {
      console.warn = oldConsoleError;
    });

    test('if both children and sections were passed', () => {
      const component = render(
        <WuiHeader
          sections={[
            {
              items: ['Item 1', 'Item 2'],
            },
          ]}>
          Child
        </WuiHeader>
      );

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        'cannot accept both `children` and `sections`'
      );
      expect(component).toMatchSnapshot();
    });
  });
});
