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
  ChangeEventHandler,
  InputHTMLAttributes,
  forwardRef,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

export type WuiRangeSliderProps = InputHTMLAttributes<HTMLInputElement> &
  CommonProps & {
    id?: string;
    name?: string;
    min: number;
    max: number;
    step?: number;
    compressed?: boolean;
    hasFocus?: boolean;
    showRange?: boolean;
    showTicks?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    onChange?: ChangeEventHandler<HTMLInputElement>;
  };

export const WuiRangeSlider = forwardRef<HTMLInputElement, WuiRangeSliderProps>(
  (
    {
      className,
      disabled,
      id,
      max,
      min,
      name,
      step,
      onChange,
      tabIndex,
      value,
      style,
      showTicks,
      showRange,
      hasFocus,
      compressed,
      ...rest
    },
    ref
  ) => {
    const classes = classNames(
      'wuiRangeSlider',
      {
        'wuiRangeSlider--hasTicks': showTicks,
        'wuiRangeSlider--hasFocus': hasFocus,
        'wuiRangeSlider--hasRange': showRange,
        'wuiRangeSlider--compressed': compressed,
      },
      className
    );
    return (
      <input
        ref={ref}
        type="range"
        id={id}
        name={name}
        className={classes}
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={onChange}
        style={style}
        tabIndex={tabIndex}
        {...rest}
      />
    );
  }
);

WuiRangeSlider.displayName = 'WuiRangeSlider';
