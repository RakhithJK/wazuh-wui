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

import { WuiColorStops } from './color_stops';

import {
  VISUALIZATION_COLORS,
  DEFAULT_VISUALIZATION_COLOR,
  keys,
} from '../../../services';
import { requiredProps, findTestSubject } from '../../../test';

jest.mock('../../portal', () => ({
  WuiPortal: ({ children }: { children: any }) => children,
}));

const onChange = jest.fn();

const colorStopsArray = [
  { stop: 0, color: '#FF0000' },
  { stop: 25, color: '#00FF00' },
  { stop: 35, color: '#0000FF' },
];

// Note: A couple tests that would be nice, but can't be accomplished at the moment:
// - Tab to bypass thumbs (tabindex="-1" not respected)
// - Drag to reposition thumb (we can't get real page position info)

test('renders WuiColorStops', () => {
  const colorStops = render(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders free-range WuiColorStops', () => {
  const colorStops = render(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={[]}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders min-only WuiColorStops', () => {
  const colorStops = render(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={[]}
      min={0}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders max-only WuiColorStops', () => {
  const colorStops = render(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={[]}
      max={100}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders compressed WuiColorStops', () => {
  const colorStops = render(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      compressed={true}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders readOnly WuiColorStops', () => {
  const colorStops = render(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      readOnly={true}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders fullWidth WuiColorStops', () => {
  const colorStops = render(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      fullWidth={true}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders disabled WuiColorStops', () => {
  const colorStops = render(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      disabled={true}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders fixed stop WuiColorStops', () => {
  const colorStops = render(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      stopType="fixed"
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders empty WuiColorStops', () => {
  const colorStops = render(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={[]}
      min={0}
      max={100}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('popover color selector is shown when the thumb is clicked', () => {
  const colorStops = mount(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  findTestSubject(colorStops, 'wuiColorStopThumb')
    .first()
    .simulate('mousedown', { pageX: 0, pageY: 0 });
  const colorSelector = findTestSubject(colorStops, 'wuiColorStopPopover');
  expect(colorSelector.length).toBe(1);
});

test('stop input updates stops', () => {
  const colorStops = mount(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  findTestSubject(colorStops, 'wuiColorStopThumb')
    .first()
    .simulate('mousedown', { pageX: 0, pageY: 0 });
  const event = { target: { value: '10' } };
  const inputs = colorStops.find('input[type="number"]');
  expect(inputs.length).toBe(1);
  inputs.simulate('change', event);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 10 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
});

test('stop input updates stops with error prevention (reset to bounds)', () => {
  const colorStops = mount(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  findTestSubject(colorStops, 'wuiColorStopThumb')
    .first()
    .simulate('mousedown', { pageX: 0, pageY: 0 });
  const event = { target: { value: '1000' } };
  const inputs = colorStops.find('input[type="number"]');
  inputs.simulate('change', event);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 100 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
});

test('hex input updates stops', () => {
  const colorStops = mount(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  findTestSubject(colorStops, 'wuiColorStopThumb')
    .first()
    .simulate('mousedown', { pageX: 0, pageY: 0 });
  const event = { target: { value: '#FFFFFF' } };
  const inputs = colorStops.find('input[type="text"]');
  expect(inputs.length).toBe(1);
  inputs.simulate('change', event);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: '#FFFFFF', stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
});

test('hex input updates stops with error', () => {
  const colorStops = mount(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  findTestSubject(colorStops, 'wuiColorStopThumb')
    .first()
    .simulate('mousedown', { pageX: 0, pageY: 0 });
  const event = { target: { value: '#FFFFF' } };
  const inputs = colorStops.find('input[type="text"]');
  inputs.simulate('change', event);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: '#FFFFF', stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    true // isInvalid
  );
});

test('picker updates stops', () => {
  const colorStops = mount(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  findTestSubject(colorStops, 'wuiColorStopThumb')
    .first()
    .simulate('mousedown', { pageX: 0, pageY: 0 });
  const swatches = colorStops.find('button.wuiColorPicker__swatchSelect');
  expect(swatches.length).toBe(VISUALIZATION_COLORS.length);
  swatches.first().simulate('click');
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: VISUALIZATION_COLORS[0], stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
});

test('thumb focus changes', () => {
  const colorStops = mount(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const wrapper = findTestSubject(colorStops, 'wuiColorStops');
  const thumbs = findTestSubject(colorStops, 'wuiColorStopThumb');
  wrapper.simulate('focus');
  wrapper.simulate('keydown', {
    key: keys.ARROW_DOWN,
  });
  expect(thumbs.first().getDOMNode()).toEqual(document.activeElement);
  thumbs.first().simulate('keydown', {
    key: keys.ARROW_DOWN,
  });
  expect(thumbs.at(1).getDOMNode()).toEqual(document.activeElement);
});

test('thumb direction movement', () => {
  const colorStops = mount(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const wrapper = findTestSubject(colorStops, 'wuiColorStops');
  const thumbs = findTestSubject(colorStops, 'wuiColorStopThumb');
  wrapper.simulate('focus');
  wrapper.simulate('keydown', {
    key: keys.ARROW_DOWN,
  });
  expect(thumbs.first().getDOMNode()).toEqual(document.activeElement);
  thumbs.first().simulate('keydown', {
    key: keys.ARROW_RIGHT,
  });
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 1 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
  thumbs.first().simulate('keydown', {
    key: keys.ARROW_LEFT,
  });
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
});

test('add new thumb via keyboard', () => {
  const colorStops = mount(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const wrapper = findTestSubject(colorStops, 'wuiColorStops');
  wrapper.simulate('focus');
  wrapper.simulate('keydown', {
    key: keys.ENTER,
  });
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
      { color: DEFAULT_VISUALIZATION_COLOR, stop: 45 },
    ],
    false
  );
});

test('add new thumb via click', () => {
  const colorStops = mount(
    <WuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const wrapper = findTestSubject(colorStops, 'wuiColorStopsAdd');
  wrapper.simulate('click', { pageX: 45, pageY: 0 });
  expect(onChange).toBeCalled();
  // This is a very odd expectation.
  // But we can't get actual page positions in this environment (no getBoundingClientRect)
  // So we'll expect the _correct_ color and _incorrect_ stop value (NaN),
  // with the `isInvalid` arg _correctly_ true as a result.
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
      { color: DEFAULT_VISUALIZATION_COLOR, stop: NaN },
    ],
    true // isInvalid
  );
});
