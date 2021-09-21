import React, { useState } from 'react';

import { EuiBadge, EuiPopover, EuiText } from '../../../../../src/components';
/**
 * Deployment Menu
 */

export default () => {
  const [isDeploymentMenuVisible, setIsDeploymentMenuVisible] = useState(false);
  return (
    <EuiPopover
      id="guideHeaderDeploymentMenuExample"
      repositionOnScroll
      button={
        <EuiBadge
          iconType="arrowDown"
          iconSide="right"
          aria-controls="guideHeaderDeploymentMenuExample"
          aria-expanded={isDeploymentMenuVisible}
          aria-haspopup="true"
          onClickAriaLabel="Current deployment: Production logs. Click to open deployment menu."
          onClick={() => setIsDeploymentMenuVisible(!isDeploymentMenuVisible)}
        >
          Production logs
        </EuiBadge>
      }
      isOpen={isDeploymentMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsDeploymentMenuVisible(false)}
    >
      <EuiText size="s" color="subdued">
        <p>Deployment menu pattern TBD</p>
      </EuiText>
    </EuiPopover>
  );
};
