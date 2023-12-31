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

import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ChangeEventHandler,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../../common';

import { WuiToggle, ToggleType } from '../../toggle';
import { WuiButton, WuiButtonProps } from '../button';
import { useRenderToText } from '../../inner_text/render_to_text';

export interface WuiButtonToggleProps extends WuiButtonProps, CommonProps {
  /**
   * Simulates a `WuiButtonEmpty`
   */
  isEmpty?: boolean;

  /**
   * Hides the label from the button content and only displays the icon
   */
  isIconOnly?: boolean;

  /**
   * Initial state of the toggle
   */
  isSelected?: boolean;

  /**
   * Button label, which is also passed to `WuiToggle` as the input's label
   */
  label: ReactNode;

  /**
   * Classnames to add to `WuiToggle` instead of the `WuiButton`
   */
  toggleClassName?: string;

  /**
   * Is the button a single action or part of a group (multi)?
   * Used primarily for `WuiButtonGroup`
   */
  type?: ToggleType;

  onChange?: ChangeEventHandler<HTMLInputElement>;
}

type WuiButtonTogglePropsForAnchor = WuiButtonToggleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'name' | 'href' | 'onClick'> & {
    href?: string;
    name?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  };

type WuiButtonTogglePropsForButtonToggle = WuiButtonToggleProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'name' | 'onClick' | 'value'
  > & {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    name?: string;
    value?: string;
  };

type Props = ExclusiveUnion<
  WuiButtonTogglePropsForAnchor,
  WuiButtonTogglePropsForButtonToggle
>;

export const WuiButtonToggle: FunctionComponent<Props> = ({
  className,
  color = 'primary',
  isDisabled,
  isEmpty,
  isIconOnly,
  isSelected,
  label,
  name,
  onChange,
  toggleClassName,
  type,
  value,
  'data-test-subj': dataTestSubj,
  ...rest
}) => {
  const classes = classNames(
    'wuiButtonToggle',
    {
      'wuiButtonToggle--isIconOnly': isIconOnly,
      'wuiButtonToggle--isEmpty': isEmpty,
    },
    className
  );

  const wrapperClasses = classNames(
    'wuiButtonToggle__wrapper',
    {
      'wuiButtonToggle--isDisabled': isDisabled,
    },
    toggleClassName
  );

  const buttonContent = isIconOnly ? '' : label;
  const labelText = useRenderToText(
    label,
    typeof label === 'string' ? label : ''
  );

  return (
    <WuiToggle
      className={wrapperClasses}
      inputClassName="wuiButtonToggle__input"
      checked={isSelected}
      isDisabled={isDisabled}
      label={labelText}
      name={name}
      onChange={onChange}
      type={type}
      title={labelText}
      value={value}
      data-test-subj={dataTestSubj}>
      <WuiButton
        tabIndex={-1} // prevents double focus from input to button
        className={classes}
        color={color}
        disabled={isDisabled}
        size={isIconOnly ? 's' : undefined} // only force small if it's the icon only version
        {...(rest as Extract<
          WuiButtonTogglePropsForAnchor,
          WuiButtonTogglePropsForButtonToggle
        >)}>
        {buttonContent}
      </WuiButton>
    </WuiToggle>
  );
};
