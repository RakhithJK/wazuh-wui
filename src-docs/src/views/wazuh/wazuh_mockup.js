import React, { useState, useEffect } from 'react';
import {
  CollapsibleNav,
  HeaderAlerts,
  UserMenu,
  SpacesMenu,
  SearchInput,
} from './components';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiPage,
  EuiPageHeader,
  EuiPageBody,
  EuiPageContentBody,
  EuiShowFor,
  EuiLink,
  EuiPanel,
} from '../../../../src/components';

export default () => {
  useEffect(() => {
    document.body.classList.add('euiBody--headerIsFixed--double');

    return () => {
      document.body.classList.remove('euiBody--headerIsFixed--double');
    };
  }, []);

  const [isAlertFlyoutVisible, setIsAlertFlyoutVisible] = useState(false);

  return (
    <>
      <EuiHeader
        position="fixed"
        sections={[
          {
            items: [<EuiHeaderLogo iconType="logoElastic" href="" />],
            borders: 'none',
            breadcrumbs: [
              {
                text: 'Management',
                onClick: () => {},
              },
              {
                text: 'Users',
              },
            ],
          },
          {
            items: [
              <EuiShowFor sizes={['m', 'l', 'xl']}>
                <SearchInput />
              </EuiShowFor>,
            ],
            borders: 'none',
          },
          {
            items: [
              <EuiShowFor sizes={['xs', 's']}>
                <SearchInput />
              </EuiShowFor>,
              <EuiHeaderSectionItemButton
                notification={true}
                aria-label="Notifications: Updates available"
                onClick={() => setIsAlertFlyoutVisible(!isAlertFlyoutVisible)}
              >
                <EuiIcon type="cheer" size="m" />
              </EuiHeaderSectionItemButton>,
              <UserMenu />,
            ],
            borders: 'none',
          },
        ]}
      />
      <EuiHeader
        position="fixed"
        sections={[
          {
            items: [<CollapsibleNav />, <SpacesMenu />],
            borders: 'right',
          },
          {
            items: [
              <EuiHeaderLinks
                popoverProps={{
                  repositionOnScroll: true, // Necessary when placing search in a fixed component
                }}
              >
                <EuiHeaderLink color="primary">Share</EuiHeaderLink>
                <EuiHeaderLink color="primary">Clone</EuiHeaderLink>
              </EuiHeaderLinks>,
            ],
          },
        ]}
      />
      {isAlertFlyoutVisible ? (
        <HeaderAlerts setIsAlertFlyoutVisible={setIsAlertFlyoutVisible} />
      ) : null}
      <EuiPage paddingSize="l">
        <EuiPageBody>
          <EuiPageHeader
            pageTitle=""
            tabs={[
              { label: 'Dashboard', isSelected: true },
              { label: 'Analysis' },
            ]}
            rightSideItems={[<EuiLink>Export</EuiLink>]}
            bottomBorder
          />
          <EuiPageContentBody>
            <EuiFlexGrid columns={2}>
              <EuiFlexItem>
                <EuiPanel style={{ height: 200 }} />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel style={{ height: 200 }} />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel style={{ height: 200 }} />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel style={{ height: 200 }} />
              </EuiFlexItem>
            </EuiFlexGrid>
          </EuiPageContentBody>
        </EuiPageBody>
      </EuiPage>
    </>
  );
};
