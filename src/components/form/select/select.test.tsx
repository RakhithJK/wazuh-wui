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
import { requiredProps } from '../../../test/required_props';

import { WuiSelect } from './select';

jest.mock('../form_control_layout', () => ({
  WuiFormControlLayout: 'wui-form-control-layout',
}));
jest.mock('../validatable_control', () => ({
  WuiValidatableControl: 'wui-validatable-control',
}));

describe('WuiSelect', () => {
  test('is rendered', () => {
    const component = render(
      <WuiSelect id="id" name="name" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('options are rendered', () => {
      const component = render(
        <WuiSelect
          options={[
            { value: '1', text: 'Option #1' },
            { value: '2', text: 'Option #2' },
          ]}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const component = render(<WuiSelect isInvalid />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(<WuiSelect fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(<WuiSelect isLoading />);

      expect(component).toMatchSnapshot();
    });

    test('disabled options are rendered', () => {
      const component = render(
        <WuiSelect
          options={[
            { value: '1', text: 'Option #1', disabled: false },
            { value: '2', text: 'Option #2', disabled: true },
          ]}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('value option is rendered', () => {
      const component = render(
        <WuiSelect
          options={[
            { value: '1', text: 'Option #1' },
            { value: '2', text: 'Option #2' },
          ]}
          value={'1'}
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
