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

import React, { ButtonHTMLAttributes, Component } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { WuiFlexGroup, WuiFlexItem } from '../flex';

import { WuiIcon } from '../icon';

export type FilterChecked = 'on' | 'off';
export interface WuiFilterSelectItemProps
  extends CommonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: FilterChecked;
  showIcons?: boolean;
  isFocused?: boolean;
}

const resolveIconAndColor = (checked?: FilterChecked) => {
  if (!checked) {
    return { icon: 'empty' };
  }
  return checked === 'on'
    ? {
        icon: 'check',
        color: 'text',
      }
    : {
        icon: 'cross',
        color: 'text',
      };
};

export class WuiFilterSelectItem extends Component<WuiFilterSelectItemProps> {
  static defaultProps = {
    showIcons: true,
  };

  buttonRef: HTMLButtonElement | null = null;

  state = {
    hasFocus: false,
  };

  focus = () => {
    if (this.buttonRef) {
      this.buttonRef.focus();
    }
  };

  hasFocus = () => {
    return this.state.hasFocus;
  };

  render() {
    const {
      children,
      className,
      disabled,
      checked,
      isFocused,
      showIcons,
      ...rest
    } = this.props;
    const classes = classNames(
      'wuiFilterSelectItem',
      {
        'wuiFilterSelectItem-isFocused': isFocused,
      },
      className
    );

    let iconNode;
    if (showIcons) {
      const { icon, color } = resolveIconAndColor(checked);
      iconNode = (
        <WuiFlexItem grow={false}>
          <WuiIcon color={color} type={icon} />
        </WuiFlexItem>
      );
    }

    return (
      <button
        ref={ref => (this.buttonRef = ref)}
        role="option"
        type="button"
        aria-selected={isFocused}
        className={classes}
        disabled={disabled}
        aria-disabled={disabled}
        {...rest}>
        <WuiFlexGroup
          alignItems="center"
          gutterSize="s"
          component="span"
          responsive={false}>
          {iconNode}
          <WuiFlexItem
            className="wuiFilterSelectItem__content"
            component="span">
            {children}
          </WuiFlexItem>
        </WuiFlexGroup>
      </button>
    );
  }
}
