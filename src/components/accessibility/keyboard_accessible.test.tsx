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

/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from 'react';
import { render, shallow } from 'enzyme';

import { WuiKeyboardAccessible } from './keyboard_accessible';

import { keys } from '../../services';

const noop = () => {
  // eslint-disable-line no-empty
};

describe('WuiKeyboardAccessible', () => {
  describe('throws an error', () => {
    const oldConsoleError = console.error;
    let consoleStub: jest.Mock<typeof console.error>;

    beforeEach(() => {
      // We don't use jest.spyOn() here, because WUI's tests apply a global
      // console.error() override that throws an exception. For these
      // tests, we just want to know if console.error() was called.

      console.error = consoleStub = jest.fn();
    });

    afterEach(() => {
      console.error = oldConsoleError;
    });

    test("when there's no child", () => {
      // @ts-ignore unused var
      const component = <WuiKeyboardAccessible />; // eslint-disable-line @typescript-eslint/no-unused-vars

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        'needs to wrap an element with which the user interacts.'
      );
    });

    test('when the child is a button', () => {
      // @ts-ignore unused var
      const component = ( // eslint-disable-line @typescript-eslint/no-unused-vars
        <WuiKeyboardAccessible>
          <button onClick={noop} />
        </WuiKeyboardAccessible>
      );

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        "doesn't need to be used on a button."
      );
    });

    test('when the child is a link with an href', () => {
      // @ts-ignore unused var
      const component = ( // eslint-disable-line @typescript-eslint/no-unused-vars
        <WuiKeyboardAccessible>
          <a href="#" onClick={noop}>
            Click me
          </a>
        </WuiKeyboardAccessible>
      );

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        "doesn't need to be used on a link if it has a href attribute."
      );
    });

    test("when the child doesn't have an onClick prop", () => {
      // @ts-ignore unused var
      const component = ( // eslint-disable-line @typescript-eslint/no-unused-vars
        <WuiKeyboardAccessible>
          <div />
        </WuiKeyboardAccessible>
      );

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        'needs to wrap an element which has an onClick prop assigned.'
      );
    });

    test("when the child's onClick prop isn't a function", () => {
      // @ts-ignore unused var
      const component = ( // eslint-disable-line @typescript-eslint/no-unused-vars
        <WuiKeyboardAccessible>
          <div
            // @ts-ignore not a valid prop type
            onClick="notAFunction"
          />
        </WuiKeyboardAccessible>
      );

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        "child's onClick prop needs to be a function."
      );
    });
  });

  describe("doesn't throw an error", () => {
    let oldConsoleError: typeof console.error;
    let consoleStub: jest.Mock<typeof console.error>;

    beforeEach(() => {
      oldConsoleError = console.error;
      console.error = consoleStub = jest.fn();
    });

    afterEach(() => {
      console.error = oldConsoleError;
    });

    test('when the element is a link without an href', () => {
      // @ts-ignore unused var
      const component = ( // eslint-disable-line @typescript-eslint/no-unused-vars
        <WuiKeyboardAccessible>
          <a onClick={noop}>Click me</a>
        </WuiKeyboardAccessible>
      );

      expect(consoleStub).not.toBeCalled();
    });
  });

  describe('adds accessibility attributes', () => {
    test('tabindex and role', () => {
      const $button = render(
        <WuiKeyboardAccessible>
          <div onClick={noop} />
        </WuiKeyboardAccessible>
      );

      expect($button).toMatchSnapshot();
    });
  });

  describe("doesn't override pre-existing accessibility attributes", () => {
    test('tabindex', () => {
      const $button = render(
        <WuiKeyboardAccessible>
          <div onClick={noop} tabIndex={1} />
        </WuiKeyboardAccessible>
      );

      expect($button).toMatchSnapshot();
    });

    test('role', () => {
      const $button = render(
        <WuiKeyboardAccessible>
          <div onClick={noop} role="button" tabIndex={0} />
        </WuiKeyboardAccessible>
      );

      expect($button).toMatchSnapshot();
    });
  });

  describe('calls onClick', () => {
    test('on ENTER keyup', () => {
      const onClickHandler = jest.fn();

      const $button = shallow(
        <WuiKeyboardAccessible>
          <div data-div onClick={onClickHandler} />
        </WuiKeyboardAccessible>
      );

      $button.find('[data-div]').simulate('keyup', {
        key: keys.ENTER,
      });

      expect(onClickHandler).toBeCalled();
    });

    test('on SPACE keyup', () => {
      const onClickHandler = jest.fn();

      const $button = shallow(
        <WuiKeyboardAccessible>
          <div data-div onClick={onClickHandler} />
        </WuiKeyboardAccessible>
      );

      $button.find('[data-div]').simulate('keyup', {
        key: keys.SPACE,
      });

      expect(onClickHandler).toBeCalled();
    });
  });

  describe("child's props", () => {
    test('onKeyUp handler is called', () => {
      const onKeyUpHandler = jest.fn();

      const $button = shallow(
        <WuiKeyboardAccessible>
          <div data-div onKeyUp={onKeyUpHandler} />
        </WuiKeyboardAccessible>
      );

      $button.find('[data-div]').simulate('keyup', {
        keyCode: 0,
      });

      expect(onKeyUpHandler).toBeCalled();
    });

    test('onKeyDown handler is called', () => {
      const onKeyDownHandler = jest.fn();

      const $button = shallow(
        <WuiKeyboardAccessible>
          <div data-div onKeyDown={onKeyDownHandler} />
        </WuiKeyboardAccessible>
      );

      $button.find('[data-div]').simulate('keydown', {
        keyCode: 0,
      });

      expect(onKeyDownHandler).toBeCalled();
    });
  });
});
