import React, { useState } from 'react';

import { WuiColorStops, WuiFormRow } from '../../../../src/components';

export default () => {
  const [emptyColorStops, setEmptyColorStops] = useState([]);

  const handleEmptyChange = colorStops => {
    setEmptyColorStops(colorStops);
  };

  const [emptyColorStops2, setEmptyColorStops2] = useState([]);

  const handleEmptyChange2 = colorStops => {
    setEmptyColorStops2(colorStops);
  };

  const [emptyColorStops3, setEmptyColorStops3] = useState([]);

  const handleEmptyChange3 = colorStops => {
    setEmptyColorStops3(colorStops);
  };

  const [singleColorStops, setSingleColorStops] = useState([
    { stop: 10, color: '#D36086' },
  ]);

  const handleSingleChange = colorStops => {
    setSingleColorStops(colorStops);
  };

  const [singleColorStops2, setSingleColorStops2] = useState([
    { stop: 10, color: '#D36086' },
  ]);

  const handleSingleChange2 = colorStops => {
    setSingleColorStops2(colorStops);
  };

  const [singleColorStops3, setSingleColorStops3] = useState([
    { stop: 10, color: '#D36086' },
  ]);

  const handleSingleChange3 = colorStops => {
    setSingleColorStops3(colorStops);
  };

  return (
    <React.Fragment>
      <WuiFormRow label="Empty array without `min` or `max`">
        <WuiColorStops
          label="Empty start"
          onChange={handleEmptyChange2}
          colorStops={emptyColorStops2}
          stopType="fixed"
        />
      </WuiFormRow>
      <WuiFormRow label="Empty array with `min` defined">
        <WuiColorStops
          label="Empty start"
          onChange={handleEmptyChange}
          colorStops={emptyColorStops}
          min={0}
          stopType="fixed"
        />
      </WuiFormRow>
      <WuiFormRow label="Empty array with `max` defined">
        <WuiColorStops
          label="Empty start"
          onChange={handleEmptyChange3}
          colorStops={emptyColorStops3}
          max={100}
          stopType="fixed"
        />
      </WuiFormRow>
      <WuiFormRow label="Single stop without `min` or `max`">
        <WuiColorStops
          label="Single start"
          onChange={handleSingleChange}
          colorStops={singleColorStops}
          stopType="fixed"
        />
      </WuiFormRow>
      <WuiFormRow label="Single stop with `min` defined">
        <WuiColorStops
          label="Single start"
          onChange={handleSingleChange2}
          colorStops={singleColorStops2}
          min={0}
          stopType="fixed"
        />
      </WuiFormRow>
      <WuiFormRow label="Single stop with `max` defined">
        <WuiColorStops
          label="Single start"
          onChange={handleSingleChange3}
          colorStops={singleColorStops3}
          max={100}
          stopType="fixed"
        />
      </WuiFormRow>
    </React.Fragment>
  );
};
