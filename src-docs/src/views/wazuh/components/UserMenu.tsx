import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  EuiAvatar,
  EuiHeaderSectionItemButton,
  EuiPopover,
  EuiText,
} from '../../../../../src/components';

/**
 * User Menu
 */
export default () => {
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);

  return (
    <EuiPopover
      id="guideHeaderUserMenuExample"
      repositionOnScroll
      button={
        <EuiHeaderSectionItemButton
          aria-controls="guideHeaderUserMenuExample"
          aria-expanded={isUserMenuVisible}
          aria-haspopup="true"
          aria-label="User menu"
          onClick={() => setIsUserMenuVisible(!isUserMenuVisible)}
        >
          <EuiAvatar name="John Username" size="s" />
        </EuiHeaderSectionItemButton>
      }
      isOpen={isUserMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsUserMenuVisible(false)}
    >
      <div style={{ width: 320 }}>
        <EuiText size="s" color="subdued">
          <p>
            Please see the component page for{' '}
            <Link to="/layout/header">
              <strong>EuiHeader</strong>
            </Link>{' '}
            on how to configure your user menu.
          </p>
        </EuiText>
      </div>
    </EuiPopover>
  );
};
