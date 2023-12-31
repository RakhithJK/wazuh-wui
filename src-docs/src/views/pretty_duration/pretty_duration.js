import React, { Fragment } from 'react';

import {
  WuiSpacer,
  WuiCodeBlock,
  WuiText,
  prettyDuration,
} from '../../../../src/components';

const examples = [
  {
    start: '2018-01-17T18:57:57.149Z',
    end: '2018-01-17T20:00:00.000Z',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY, HH:mm:ss.SSS',
  },
  {
    start: '2018-01-17T18:57:57.149Z',
    end: '2018-01-17T20:00:00.000Z',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY @ HH:mm:ss.SSS',
  },
  {
    start: '2018-01-17T18:57:57.149Z',
    end: 'now-2h',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY @ HH:mm:ss.SSS',
  },
  {
    start: 'now-17m',
    end: 'now',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY @ HH:mm:ss.SSS',
  },
  {
    start: 'now-17m',
    end: 'now-1m',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY @ HH:mm:ss.SSS',
  },
  {
    start: 'now-15m',
    end: 'now',
    quickRanges: [
      {
        start: 'now-15m',
        end: 'now',
        label: 'quick range 15 minutes custom display',
      },
    ],
    dateFormat: 'MMMM Do YYYY, HH:mm:ss.SSS',
  },
];

export default function prettyDurationExample() {
  return (
    <Fragment>
      {examples.map(({ start, end, quickRanges, dateFormat }, idx) => (
        <div key={idx}>
          <WuiCodeBlock paddingSize="s" isCopyable language="js">
            prettyDuration(&apos;{start}&apos;, &apos;{end}&apos;,{' '}
            {JSON.stringify(quickRanges)}, &apos;
            {dateFormat}&apos;)
          </WuiCodeBlock>

          <WuiSpacer size="s" />

          <WuiText>
            <p>{prettyDuration(start, end, quickRanges, dateFormat)}</p>
          </WuiText>

          <WuiSpacer size="xl" />
        </div>
      ))}
    </Fragment>
  );
}
