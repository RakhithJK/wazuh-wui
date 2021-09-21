import React from 'react';
import { Link } from 'react-router-dom';

import {
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiSelectableTemplateSitewide,
  EuiSelectableMessage,
} from '../../../../../src/components';

/**
 * Sitewide search
 */
export default () => (
  <EuiSelectableTemplateSitewide
    options={[]}
    searchProps={{
      append: '⌘K',
      compressed: true,
    }}
    popoverButton={
      <EuiHeaderSectionItemButton aria-label="Sitewide search">
        <EuiIcon type="search" size="m" />
      </EuiHeaderSectionItemButton>
    }
    popoverButtonBreakpoints={['xs', 's']}
    popoverProps={{
      repositionOnScroll: true, // Necessary when placing search in a fixed component
    }}
    emptyMessage={
      <EuiSelectableMessage style={{ minHeight: 300 }}>
        <p>
          Please see the component page for{' '}
          <Link to="/forms/selectable">
            <strong>EuiSelectableTemplateSitewide</strong>
          </Link>{' '}
          on how to configure your sitewide search.
        </p>
      </EuiSelectableMessage>
    }
  />
);
