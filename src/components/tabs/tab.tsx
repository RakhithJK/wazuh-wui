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
  MouseEventHandler,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../common';
import { getSecureRelForTarget } from '../../services';
import { validateHref } from '../../services/security/href_validator';

export interface WuiTabProps extends CommonProps {
  isSelected?: boolean;
  disabled?: boolean;
}

type WuiTabPropsForAnchor = WuiTabProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick' | 'href'> & {
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  };

type WuiTabPropsForButton = WuiTabProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };

export type Props = ExclusiveUnion<WuiTabPropsForAnchor, WuiTabPropsForButton>;

export const WuiTab: FunctionComponent<Props> = ({
  isSelected,
  children,
  className,
  disabled: _disabled,
  href,
  target,
  rel,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const disabled = _disabled || !isHrefValid;

  const classes = classNames('wuiTab', className, {
    'wuiTab-isSelected': isSelected,
    'wuiTab-isDisabled': disabled,
  });

  //  <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  //  this is a button and piggyback off its disabled styles.
  if (href && !disabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    return (
      <a
        role="tab"
        aria-selected={!!isSelected}
        className={classes}
        href={href}
        target={target}
        rel={secureRel}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        <span className="wuiTab__content">{children}</span>
      </a>
    );
  }

  return (
    <button
      role="tab"
      aria-selected={!!isSelected}
      type="button"
      className={classes}
      disabled={disabled}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <span className="wuiTab__content">{children}</span>
    </button>
  );
};
