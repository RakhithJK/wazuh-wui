import React, { Fragment } from 'react';

import { WuiProgress, WuiSpacer } from '../../../../src/components';

const data = [
  { label: 'Basic percentage', value: '80' },
  {
    label: 'Long percentage',
    value: '60.0703850454546453168415365451354641354684531',
  },
  { label: 'Another basic percent', value: '45' },
  { label: 'Custom valueText', value: '40', valueText: <span>4,005,678</span> },
  { label: "Women's Accessories", value: '24.0256' },
];

export default () => (
  <Fragment>
    <div style={{ maxWidth: 160 }}>
      {data.map(item => (
        <>
          <WuiProgress
            valueText={true}
            max={100}
            color="secondary"
            size="s"
            {...item}
          />
          <WuiSpacer size="s" />
        </>
      ))}
    </div>
    <WuiSpacer size="m" />
    <div style={{ maxWidth: 200 }}>
      {data.map(item => (
        <>
          <WuiProgress
            valueText={true}
            max={100}
            color="primary"
            size="m"
            {...item}
          />
          <WuiSpacer size="s" />
        </>
      ))}
    </div>
  </Fragment>
);
