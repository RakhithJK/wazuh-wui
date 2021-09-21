import React from 'react';
import { Link } from 'react-router-dom';

import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiPortal,
  EuiText,
  EuiTitle,
} from '../../../../../src/components';

/**
 * Header Alerts
 */
export default ({
  setIsAlertFlyoutVisible = (isVisible: boolean) => isVisible,
}) => (
  <EuiPortal>
    <EuiFlyout
      onClose={() => setIsAlertFlyoutVisible(false)}
      size="s"
      id="guideHeaderAlertExample"
      aria-labelledby="guideHeaderAlertExampleTitle"
    >
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="s">
          <h2 id="guideHeaderAlertExampleTitle">EuiHeaderAlert</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText size="s" color="subdued">
          <p>
            Please see the component page for{' '}
            <Link to="/layout/header">
              <strong>EuiHeaderAlert</strong>
            </Link>{' '}
            on how to configure your alerts.
          </p>
        </EuiText>
      </EuiFlyoutBody>
    </EuiFlyout>
  </EuiPortal>
);
