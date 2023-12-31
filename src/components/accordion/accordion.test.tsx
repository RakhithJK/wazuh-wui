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
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { WuiAccordion } from './accordion';

jest.mock('./../../services/accessibility', () => ({
  htmlIdGenerator: () => () => 'generated-id',
}));

let id = 0;
const getId = () => `${id++}`;

describe('WuiAccordion', () => {
  test('is rendered', () => {
    const component = render(<WuiAccordion id={getId()} {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('buttonContentClassName', () => {
      it('is rendered', () => {
        const component = render(
          <WuiAccordion
            id={getId()}
            buttonContentClassName="button content class name"
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('buttonContent', () => {
      it('is rendered', () => {
        const component = render(
          <WuiAccordion
            id={getId()}
            buttonContent={<div>Button content</div>}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('extraAction', () => {
      it('is rendered', () => {
        const component = render(
          <WuiAccordion
            id={getId()}
            extraAction={<button>Extra action</button>}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('initialIsOpen', () => {
      it('is rendered', () => {
        const component = render(
          <WuiAccordion id={getId()} initialIsOpen={true}>
            <p>You can see me.</p>
          </WuiAccordion>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('arrowDisplay', () => {
      it('right is rendered', () => {
        const component = render(
          <WuiAccordion id={getId()} arrowDisplay="right">
            <p>You can see me.</p>
          </WuiAccordion>
        );

        expect(component).toMatchSnapshot();
      });

      it('none is rendered', () => {
        const component = render(
          <WuiAccordion id={getId()} arrowDisplay="none">
            <p>You can see me.</p>
          </WuiAccordion>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('forceState', () => {
      it('is rendered', () => {
        const component = render(
          <WuiAccordion id={getId()} forceState="closed">
            <p>You can not see me</p>
          </WuiAccordion>
        );

        expect(component).toMatchSnapshot();
      });

      it('accepts and calls an optional callback on click', () => {
        const onToggleHandler = jest.fn();
        const component = mount(
          <WuiAccordion
            id={getId()}
            onToggle={onToggleHandler}
            forceState="closed"
          />
        );

        component.find('button').simulate('click');
        expect(onToggleHandler).toBeCalled();
        expect(onToggleHandler).toBeCalledWith(true);
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const component = render(
          <WuiAccordion id={getId()} isLoading>
            <p>You can see me.</p>
          </WuiAccordion>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isLoadingMessage', () => {
      it('is rendered', () => {
        const component = render(
          <WuiAccordion id={getId()} isLoadingMessage="Please wait" isLoading>
            <p>You can&apos;t see me.</p>
          </WuiAccordion>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('behavior', () => {
    it('opens when clicked once', () => {
      const component = mount(<WuiAccordion id={getId()} />);

      component.find('button').simulate('click');

      expect(component).toMatchSnapshot();
    });

    it('closes when clicked twice', () => {
      const component = mount(<WuiAccordion id={getId()} />);

      component.find('button').simulate('click');
      component.find('button').simulate('click');

      expect(component).toMatchSnapshot();
    });

    it('accepts and calls an optional callback on open and close', () => {
      const onToggleHandler = jest.fn();
      const component = mount(
        <WuiAccordion id={getId()} onToggle={onToggleHandler} />
      );

      component.find('button').simulate('click');
      expect(onToggleHandler).toBeCalled();
      expect(onToggleHandler).toBeCalledWith(true);

      component.find('button').simulate('click');
      expect(onToggleHandler).toBeCalled();
      expect(onToggleHandler).toBeCalledWith(false);
    });
  });
});
