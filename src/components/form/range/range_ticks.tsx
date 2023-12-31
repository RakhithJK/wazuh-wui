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
  ButtonHTMLAttributes,
  MouseEventHandler,
  FunctionComponent,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { useInnerText } from '../../inner_text';

export interface WuiRangeTick {
  value: number;
  label: ReactNode;
}

export type WuiRangeTicksProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'value'
> & {
  ticks?: WuiRangeTick[];
  tickSequence: number[];
  value?: number | string | Array<string | number>;
  min: number;
  max: number;
  compressed?: boolean;
  interval?: number;
  disabled?: boolean;
  onChange?: MouseEventHandler<HTMLButtonElement>;
};

const WuiTickValue: FunctionComponent<WuiRangeTicksProps & {
  tickValue: any;
  percentageWidth: number;
}> = ({
  disabled,
  ticks,
  min,
  max,
  value,
  onChange,
  percentageWidth,
  tickValue,
}) => {
  const tickStyle: { left?: string; width?: string } = {};
  let customTick;
  if (ticks) {
    customTick = ticks.find(o => o.value === tickValue);

    if (customTick) {
      tickStyle.left = `${((customTick.value - min) / (max - min)) * 100}%`;
    }
  } else {
    tickStyle.width = `${percentageWidth}%`;
  }

  const tickClasses = classNames('wuiRangeTick', {
    'wuiRangeTick--selected': value === tickValue,
    'wuiRangeTick--isCustom': customTick,
  });

  const label = customTick ? customTick.label : tickValue;

  const [ref, innerText] = useInnerText();

  return (
    <button
      type="button"
      className={tickClasses}
      value={tickValue}
      disabled={disabled}
      onClick={onChange}
      style={tickStyle}
      tabIndex={-1}
      ref={ref}
      title={typeof label === 'string' ? label : innerText}>
      {label}
    </button>
  );
};

export const WuiRangeTicks: FunctionComponent<WuiRangeTicksProps> = props => {
  const { ticks, tickSequence, max, min, interval = 1, compressed } = props;
  // Calculate the width of each tick mark
  const percentageWidth = (interval / (max - min + interval)) * 100;

  // Align with item labels across the range by adding
  // left and right negative margins that is half of the tick marks
  const ticksStyle = !!ticks
    ? undefined
    : { margin: `0 ${percentageWidth / -2}%`, left: 0, right: 0 };

  const classes = classNames('wuiRangeTicks', {
    'wuiRangeTicks--compressed': compressed,
  });

  return (
    <div className={classes} style={ticksStyle}>
      {tickSequence.map(tickValue => (
        <WuiTickValue
          key={tickValue}
          {...props}
          percentageWidth={percentageWidth}
          tickValue={tickValue}
        />
      ))}
    </div>
  );
};
