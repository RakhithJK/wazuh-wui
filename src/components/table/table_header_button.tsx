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

import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { WuiInnerText } from '../inner_text';

import { IconType, WuiIcon } from '../icon';

type Props = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    iconType?: IconType;
  };

export const WuiTableHeaderButton: FunctionComponent<Props> = ({
  children,
  className,
  iconType,
  ...rest
}) => {
  const classes = classNames('wuiTableHeaderButton', className);

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <WuiIcon
        className="wuiTableHeaderButton__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
      />
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      <WuiInnerText>
        {(ref, innerText) => (
          <span title={innerText} ref={ref}>
            {children}
          </span>
        )}
      </WuiInnerText>

      {buttonIcon}
    </button>
  );
};
