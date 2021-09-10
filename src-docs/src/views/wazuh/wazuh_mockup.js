import React from 'react';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiTitle,
  EuiButton,
  EuiSpacer,
  EuiHeader,
  EuiHeaderLogo,
} from '../../../../src/components';
const sections = [
  {
    items: [<EuiHeaderLogo />],
    borders: 'right',
  },
];
export default () => (
  <>
    <EuiHeader position={'fixed'} sections={sections} />
    <EuiPage>
      <EuiPageBody>
        <EuiPageHeader
          iconType="logoElastic"
          pageTitle="Page title"
          rightSideItems={[
            <EuiButton fill>Add something</EuiButton>,
            <EuiButton>Do something</EuiButton>,
          ]}
        />
        <EuiPageContent>
          <EuiTitle>
            <h2>Content title</h2>
          </EuiTitle>
          <EuiSpacer />
          <EuiPageContentBody>Content body</EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  </>
);
