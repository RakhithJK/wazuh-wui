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

import { WuiAspectRatio } from './aspect_ratio';

describe('WuiAspectRatio', () => {
  test('is rendered', () => {
    const component = render(
      <WuiAspectRatio height={4} width={9} {...requiredProps}>
        <iframe
          title="Wazuh is a search company"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/yJarWSLRM24"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </WuiAspectRatio>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('maxWidth', () => {
      test('is rendered', () => {
        const component = render(
          <WuiAspectRatio
            height={16}
            width={9}
            maxWidth={500}
            {...requiredProps}>
            <iframe
              title="Wazuh is a search company"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/yJarWSLRM24"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </WuiAspectRatio>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
