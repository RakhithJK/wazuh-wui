import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiPagination,
  WuiPaginationButton,
} from '../../../../src/components';

import { paginationConfig } from './playground';

import ManyPages from './many_pages';
const manyPagesSource = require('!!raw-loader!./many_pages');
const manyPagesHtml = renderToHtml(ManyPages);
const manyPagesSnippet = `<WuiPagination
  aria-label="my pagination"
  pageCount={higherThan5Number}
  activePage={activePage}
  onPageClick={goToPage}
/>
`;

import FewPages from './few_pages';
const fewPagesSource = require('!!raw-loader!./few_pages');
const fewPagesHtml = renderToHtml(FewPages);
const fewPagesSnippet = `<WuiPagination
  aria-label="my pagination"
  pageCount={lowerThan5Number}
  activePage={activePage}
  onPageClick={goToPage}
/>
`;

import CenteredPagination from './centered_pagination';
const centeredPaginationSource = require('!!raw-loader!./centered_pagination');
const centeredPaginationHtml = renderToHtml(CenteredPagination);
const centeredPaginationSnippet = `<WuiFlexGroup justifyContent="spaceAround">
  <WuiFlexItem grow={false}>
    <WuiPagination
      aria-label="my pagination"
      pageCount={pageCount}
      activePage={activePage}
      onPageClick={goToPage}
    />
  </WuiFlexItem>
</WuiFlexGroup>
`;

import CustomizablePagination from './customizable_pagination';
const customizablePaginationSource = require('!!raw-loader!./customizable_pagination');
const customizablePaginationHtml = renderToHtml(CustomizablePagination);
const customizablePaginationSnippet = `<WuiFlexGroup justifyContent="spaceBetween" alignItems="center">
  <WuiFlexItem grow={false}>
    <WuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}>
      <WuiContextMenuPanel items={items} />
    </WuiPopover>
  </WuiFlexItem>

  <WuiFlexItem grow={false}>
    <WuiPagination
      aria-label="my pagination"
      pageCount={pageCount}
      activePage={activePage}
      onPageClick={goToPage}
    />
  </WuiFlexItem>
</WuiFlexGroup>
`;

import Compressed from './compressed';
const compressedSource = require('!!raw-loader!./compressed');
const compressedHtml = renderToHtml(Compressed);
const compressedSnippet = `<WuiPagination
  aria-label="my pagination"
  pageCount={pageCount}
  activePage={activePage}
  onPageClick={goToPage}
  compressed
/>
`;

export const PaginationExample = {
  title: 'Pagination',
  sections: [
    {
      title: 'Many pages',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: manyPagesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: manyPagesHtml,
        },
      ],
      text: (
        <p>
          We only show at most 5 consecutive pages, with shortcuts to the first
          and/or last page.
        </p>
      ),
      props: { WuiPagination, WuiPaginationButton },
      snippet: manyPagesSnippet,
      demo: <ManyPages />,
    },
    {
      title: 'Few pages',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fewPagesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fewPagesHtml,
        },
      ],
      text: (
        <p>
          The UI simplifies when we have fewer than the maximum number of
          visible pages.
        </p>
      ),
      snippet: fewPagesSnippet,
      demo: <FewPages />,
    },
    {
      title: 'Centered pagination',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: centeredPaginationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: centeredPaginationHtml,
        },
      ],
      text: (
        <p>
          You can use{' '}
          <Link to="/layout/flex">
            <strong>WuiFlexGroup</strong>
          </Link>{' '}
          to set up this pagination layout.
        </p>
      ),
      snippet: centeredPaginationSnippet,
      demo: <CenteredPagination />,
    },
    {
      title: 'Compressed display',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: compressedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: compressedHtml,
        },
      ],
      text: (
        <p>
          Use the <WuiCode>compressed</WuiCode> prop to minimize the horizontal
          footprint.
        </p>
      ),
      snippet: compressedSnippet,
      demo: <Compressed />,
    },
    {
      title: 'Customizable pagination',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customizablePaginationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customizablePaginationHtml,
        },
      ],
      text: (
        <p>
          You can use{' '}
          <Link to="/layout/flex">
            <strong>WuiFlexGroup</strong>
          </Link>{' '}
          to set up this pagination layout, commonly used with{' '}
          <Link to="/tabular-content/tables">tables</Link>.
        </p>
      ),
      snippet: customizablePaginationSnippet,
      demo: <CustomizablePagination />,
    },
  ],
  playground: paginationConfig,
};
