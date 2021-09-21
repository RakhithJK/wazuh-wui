import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  EuiAvatar,
  EuiHeaderSectionItemButton,
  EuiPopover,
  EuiText,
} from '../../../../../src/components';

/**
 * Spaces Menu
 */
export default () => {
  const [isSpacesMenuVisible, setIsSpacesMenuVisible] = useState(false);

  return (
    <EuiPopover
      id="guideHeaderSpacesMenuExample"
      repositionOnScroll
      button={
        <EuiHeaderSectionItemButton
          aria-controls="guideHeaderSpacesMenuExample"
          aria-expanded={isSpacesMenuVisible}
          aria-haspopup="true"
          aria-label="Spaces menu"
          onClick={() => setIsSpacesMenuVisible(!isSpacesMenuVisible)}
        >
          <EuiAvatar type="space" name="Default Space" size="s" />
        </EuiHeaderSectionItemButton>
      }
      isOpen={isSpacesMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsSpacesMenuVisible(false)}
    >
      <div style={{ width: 320 }}>
        <EuiText size="s" color="subdued">
          <p>
            Please see the component page for{' '}
            <Link to="/layout/header">
              <strong>EuiHeader</strong>
            </Link>{' '}
            on how to configure your spaces menu.
          </p>
        </EuiText>
      </div>
    </EuiPopover>
  );
};
