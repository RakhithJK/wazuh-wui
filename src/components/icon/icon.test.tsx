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
import { mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';
import cheerio from 'cheerio';

import {
  WuiIcon,
  SIZES,
  TYPES,
  COLORS,
  clearIconComponentCache,
  appendIconComponentCache,
} from './icon';
import { PropsOf } from '../common';
// @ts-ignore importing from a JS file
import { icon as WuiIconVideoPlayer } from './assets/videoPlayer.js';

jest.mock('./icon', () => {
  return require.requireActual('./icon');
});

beforeEach(() => clearIconComponentCache());

const prettyHtml = cheerio.load('');

function testIcon(props: PropsOf<WuiIcon>) {
  return () => {
    expect.assertions(1);
    return new Promise(resolve => {
      const onIconLoad = () => {
        component.update();
        expect(prettyHtml(component.html())).toMatchSnapshot();
        resolve();
      };
      const component = mount(<WuiIcon {...props} onIconLoad={onIconLoad} />);
    });
  };
}

describe('WuiIcon', () => {
  test('is rendered', testIcon({ type: 'search', ...requiredProps }));

  describe('props', () => {
    describe('other props', () => {
      test(
        'are passed through to the icon',
        testIcon({
          type: 'search',
          'aria-label': 'A Search Icon',
          title: 'Search',
        })
      );
    });

    describe('title and titleId', () => {
      test(
        'are passed and generate an aria-labelledby',
        testIcon({
          type: 'search',
          title: 'Search icon',
          titleId: 'id-test',
        })
      );
    });

    describe('size', () => {
      SIZES.forEach(size => {
        test('${size} is rendered', testIcon({ type: 'search', size }));
      });
    });

    describe('type', () => {
      TYPES.forEach(type => {
        test(`${type} is rendered`, testIcon({ type }));
      });
    });

    describe('color', () => {
      [
        ...COLORS,
        '#fde',
        '#885522',
        'rgb(100, 150, 200)',
        'hsla(270, 60%, 70%, 0.9)',
      ].forEach(color => {
        it(`${color} is rendered`, testIcon({ type: 'search', color }));
      });
    });

    describe('tabIndex', () => {
      it(
        'renders focusable="false" when not provided',
        testIcon({ type: 'search' })
      );

      it(
        'renders focusable="false" when -1',
        testIcon({ type: 'search', tabIndex: -1 })
      );

      it(
        'renders focusable="true" when 0',
        testIcon({ type: 'search', tabIndex: 0 })
      );
    });
  });

  it('renders custom components', () => {
    const CustomIcon = ({ ...props }) => {
      return (
        <span role="img" aria-label="heart" {...props}>
          ❤️
        </span>
      );
    };
    const component = mount(<WuiIcon type={CustomIcon} />);
    expect(prettyHtml(component.html())).toMatchSnapshot();
  });

  describe('appendIconComponentCache', () => {
    it('does nothing if not called', () => {
      const component = mount(<WuiIcon type="videoPlayer" />);
      expect(
        component.find('WuiIcon[type="videoPlayer"] > WuiIconEmpty').length
      ).toBe(1);
    });

    it('injects the specified icon', () => {
      appendIconComponentCache({
        videoPlayer: WuiIconVideoPlayer,
      });
      const component = mount(<WuiIcon type="videoPlayer" />);
      expect(
        component.find('WuiIcon[type="videoPlayer"] > WuiIconVideoPlayer')
          .length
      ).toBe(1);
    });

    it('does not impact non-loaded icons', () => {
      appendIconComponentCache({
        videoPlayer: WuiIconVideoPlayer,
      });
      const component = mount(<WuiIcon type="accessibility" />);
      expect(
        component.find('WuiIcon[type="accessibility"] > WuiIconEmpty').length
      ).toBe(1);
    });
  });
});
