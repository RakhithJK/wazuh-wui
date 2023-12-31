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
import { render, shallow, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { WuiContextMenuItem } from './context_menu_item';

describe('WuiContextMenuItem', () => {
  test('is rendered', () => {
    const component = render(
      <WuiContextMenuItem {...requiredProps}>Hello</WuiContextMenuItem>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('icon', () => {
      test('is rendered', () => {
        const component = render(
          <WuiContextMenuItem icon={<span className="wuiIcon fa-user" />} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('disabled', () => {
      test('is rendered', () => {
        const component = render(<WuiContextMenuItem disabled />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      test('renders a button', () => {
        const component = render(
          <WuiContextMenuItem {...requiredProps} onClick={() => {}} />
        );

        expect(component).toMatchSnapshot();
      });

      test("isn't called upon instantiation", () => {
        const onClickHandler = jest.fn();

        shallow(<WuiContextMenuItem onClick={onClickHandler} />);

        expect(onClickHandler).not.toHaveBeenCalled();
      });

      test('is called when the item is clicked', () => {
        const onClickHandler = jest.fn();

        const component = shallow(
          <WuiContextMenuItem onClick={onClickHandler} />
        );

        component.simulate('click');

        expect(onClickHandler).toHaveBeenCalledTimes(1);
      });

      test('is not called when the item is clicked but set to disabled', () => {
        const onClickHandler = jest.fn();

        const component = mount(
          <WuiContextMenuItem disabled onClick={onClickHandler} />
        );

        component.simulate('click');

        expect(onClickHandler).not.toHaveBeenCalled();
      });
    });

    describe('href', () => {
      test('renders a link', () => {
        const component = render(
          <WuiContextMenuItem {...requiredProps} href="url" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('rel', () => {
      test('is rendered', () => {
        const component = render(
          <WuiContextMenuItem {...requiredProps} href="url" rel="help" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('target', () => {
      test('is rendered', () => {
        const component = render(
          <WuiContextMenuItem {...requiredProps} href="url" target="_blank" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('hasPanel', () => {
      test('is rendered', () => {
        const component = render(<WuiContextMenuItem hasPanel />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
