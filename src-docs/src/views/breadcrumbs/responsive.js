import React from 'react';

import {
  WuiBreadcrumbs,
  WuiTitle,
  WuiSpacer,
} from '../../../../src/components';

export default () => {
  const breadcrumbs = [
    {
      text: 'Animals',
      href: '#',
    },
    {
      text: 'Metazoans',
      href: '#',
    },
    {
      text: 'Chordates',
      href: '#',
    },
    {
      text: 'Vertebrates',
      href: '#',
    },
    {
      text: 'Tetrapods',
      href: '#',
    },
    {
      text: 'Reptiles',
      href: '#',
    },
    {
      text: 'Boa constrictor',
      href: '#',
    },
    {
      text: 'Nebulosa subspecies',
    },
  ];

  return (
    <>
      <WuiTitle size="xs">
        <span>Turning responsive completely off</span>
      </WuiTitle>
      <WuiSpacer size="s" />
      <WuiBreadcrumbs
        responsive={false}
        breadcrumbs={breadcrumbs}
        max={null}
        aria-label="An example of non-responsive WuiBreadcrumbs"
      />
      <WuiSpacer />
      <WuiTitle size="xs">
        <span>Customizing number of items to display</span>
      </WuiTitle>
      <WuiSpacer size="s" />
      <WuiBreadcrumbs
        responsive={{
          xs: 1,
          s: 3,
          m: 5,
          xl: 6,
        }}
        breadcrumbs={breadcrumbs}
        max={null}
        aria-label="An example of custom responsive WuiBreadcrumbs"
      />
    </>
  );
};
