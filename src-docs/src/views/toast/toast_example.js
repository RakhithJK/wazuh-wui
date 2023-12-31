import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiToast,
  WuiGlobalToastList,
  WuiGlobalToastListItem,
  WuiText,
  WuiSpacer,
} from '../../../../src/components';
import Guidelines from './guidelines';
import toastConfig from './playground';

import ToastList from './toast_list';
const toastListSource = require('!!raw-loader!./toast_list');
const toastListHtml = renderToHtml(ToastList);
const toastListSnippet = [
  `<WuiGlobalToastList
  toasts={[
    {
      id: 1,
      title: "Example Toast",
      text: <p><!-- Content --></p>,
    }
  ]}
  dismissToast={dismissToast}
  toastLifeTimeMs={6000}/>`,
];

import Default from './default';
const defaultSource = require('!!raw-loader!./default');
const defaultHtml = renderToHtml(Default);
const defaultToastSnippet = [
  `<WuiToast
  title="Default toast"
  onClose={closeToast}>
  <!-- Raw HTML content -->
  </WuiToast>`,
];

import Info from './info';
const infoSource = require('!!raw-loader!./info');
const infoHtml = renderToHtml(Info);
const infoToastSnippet = [
  `<WuiToast
  title="Info toast"
  type="info"
  onClose={closeToast}>
  <!-- Raw HTML content -->
  </WuiToast>`,
];

import Success from './success';
const successSource = require('!!raw-loader!./success');
const successHtml = renderToHtml(Success);
const successToastSnippet = [
  `<WuiToast
  title="Success toast"
  color="success"
  iconType="check"
  onClose={closeToast}>
  <!-- Raw HTML content -->
  </WuiToast>`,
];

import Warning from './warning';
const warningSource = require('!!raw-loader!./warning');
const warningHtml = renderToHtml(Warning);
const warningToastSnippet = [
  `<WuiToast
  title="Warning toast"
  color="warning"
  iconType="help"
  onClose={closeToast}>
  <!-- Raw HTML content -->
  </WuiToast>`,
];

import Danger from './danger';
const dangerSource = require('!!raw-loader!./danger');
const dangerHtml = renderToHtml(Danger);
const dangerToastSnippet = [
  `<WuiToast
  title="Danger toast"
  color="danger"
  iconType="alert"
  onClose={closeToast}>
  <!-- Raw HTML content -->
  </WuiToast>`,
];

export const ToastExample = {
  title: 'Toast',
  intro: (
    <WuiText>
      <p>
        Be sure to read the full{' '}
        <Link to="/guidelines/toast">toast usage guidelines</Link>.
      </p>
      <WuiSpacer />
    </WuiText>
  ),
  sections: [
    {
      title: 'Toast list',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: toastListSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: toastListHtml,
        },
      ],
      props: {
        WuiToast,
        WuiGlobalToastList,
        WuiGlobalToastListItem,
      },
      demo: (
        <>
          <ToastList />
        </>
      ),
      snippet: toastListSnippet,
    },
    {
      title: 'Default',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: defaultSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: defaultHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiToast</strong> allows for small notes that appear in the
            bottom right of the screen. They should be used for ephemeral, live
            actions (think <strong>save complete</strong> or{' '}
            <strong>something just finished right now</strong>).
          </p>
          <p>
            They should not be used for historical actions (
            <strong>your report built 30 minutes ago</strong>). This means that
            a user should never be greeted with toasts when starting a session.
            Toasts should be brief and avoid long paragraphs of text or titling.
          </p>
        </div>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Default />
        </div>
      ),
      snippet: defaultToastSnippet,
    },
    {
      title: 'Info',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: infoSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: infoHtml,
        },
      ],
      text: (
        <p>
          Setting <WuiCode language="js">type=&quot;info&quot;</WuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Info />
        </div>
      ),
      snippet: infoToastSnippet,
    },
    {
      title: 'Success',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: successSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: successHtml,
        },
      ],
      text: (
        <p>
          Setting <WuiCode language="js">color=&quot;success&quot;</WuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Success />
        </div>
      ),
      snippet: successToastSnippet,
    },
    {
      title: 'Warning',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: warningSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: warningHtml,
        },
      ],
      text: (
        <p>
          Setting <WuiCode language="js">color=&quot;warning&quot;</WuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Warning />
        </div>
      ),
      snippet: warningToastSnippet,
    },
    {
      title: 'Danger',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dangerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dangerHtml,
        },
      ],
      text: (
        <p>
          Setting <WuiCode language="js">color=&quot;danger&quot;</WuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Danger />
        </div>
      ),
      snippet: dangerToastSnippet,
    },
  ],
  guidelines: <Guidelines />,
  playground: toastConfig,
};
