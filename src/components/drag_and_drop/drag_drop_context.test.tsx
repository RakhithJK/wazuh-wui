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
import { mount, ReactWrapper } from 'enzyme';

import { findTestSubject } from '../../test';
import { requiredProps } from '../../test/required_props';

import { WuiDragDropContext } from './';
import { WuiDragDropContextContext } from './drag_drop_context';

function snapshotDragDropContext(component: ReactWrapper) {
  // Get the Portal's sibling and return its html
  const renderedHtml = component.html();
  const container = document.createElement('div');
  container.innerHTML = renderedHtml;
  return container.firstChild;
}

describe('WuiDragDropContext', () => {
  test('is rendered', () => {
    const handler = jest.fn();
    const component = mount(
      <WuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <div />
      </WuiDragDropContext>
    );

    expect(snapshotDragDropContext(component)).toMatchSnapshot();
  });

  describe('custom behavior', () => {
    describe('isDraggingType', () => {
      test('is set on proprietary context', () => {
        jest.mock('react', () => {
          const react = jest.requireActual('react');
          return {
            ...react,
            useLayoutEffect: react.useEffect,
          };
        });
        const handler = jest.fn();
        const component = mount(
          <WuiDragDropContext onDragEnd={handler} {...requiredProps}>
            <WuiDragDropContextContext.Consumer>
              {value => (
                <div data-test-subj="child">
                  {value.hasOwnProperty('isDraggingType') ? 'true' : 'false'}
                </div>
              )}
            </WuiDragDropContextContext.Consumer>
          </WuiDragDropContext>
        );

        expect(findTestSubject(component, 'child').text()).toBe('true');
      });
    });
  });
});
