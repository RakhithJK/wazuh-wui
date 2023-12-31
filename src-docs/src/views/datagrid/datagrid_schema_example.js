import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { WuiDataGrid, WuiCode } from '../../../../src/components';

import DataGridSchema from './schema';
const dataGridSchemaSource = require('!!raw-loader!./schema');
const dataGridSchemaHtml = renderToHtml(DataGridSchema);

import {
  WuiDataGridColumn,
  WuiDataGridColumnActions,
  WuiDataGridPaginationProps,
  WuiDataGridSorting,
  WuiDataGridInMemory,
  WuiDataGridStyle,
  WuiDataGridToolBarVisibilityOptions,
  WuiDataGridColumnVisibility,
} from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';

import { WuiDataGridCellValueElementProps } from '!!prop-loader!../../../../src/components/datagrid/data_grid_cell';
import { WuiDataGridSchemaDetector } from '!!prop-loader!../../../../src/components/datagrid/data_grid_schema';

export const DataGridSchemaExample = {
  title: 'Data grid schemas and popovers',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridSchemaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridSchemaHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Schemas are data types you pass to grid columns to affect how the
            columns and expansion popovers render. Schemas also allow you to
            define individual sorting comparators so that sorts can do more than
            just A-Z comparisons. By default, <strong>WuiDataGrid</strong> ships
            with a few built-in schemas for{' '}
            <WuiCode>numeric, currency, datetime, boolean and json</WuiCode>{' '}
            data. When the <WuiCode>inMemory</WuiCode> prop is in use it will
            automatically try to figure out the best schema based on the{' '}
            <WuiCode language="js">{'inMemory:{{ level: value }}'}</WuiCode> you
            set, but this will come with the caveat that you will need to
            provide and manage sorting outside the component. In general we
            recommend passing schema information to your columns instead of
            using auto-detection when you have that knowledge of your data
            available during ingestion.
          </p>
          <h2>Defining custom schemas</h2>
          <p>
            Custom schemas are passed as an array to{' '}
            <WuiCode>schemaDetectors</WuiCode> and are constructed against the{' '}
            <strong>WuiDataGridSchemaDetector</strong> interface. You can see an
            example of a simple custom schema used on the last column below. In
            addition to schemas being useful to map against for cell and
            expansion rendering, any schema will also add a
            <WuiCode language="js">
              {'className="wuiDataGridRowCell--schemaName"'}
            </WuiCode>{' '}
            to each matching cell.
          </p>
          <h2>Defining expansion</h2>
          <p>
            Likewise, you can inject custom content into any of the popovers a
            cell expands into. Add <WuiCode>popoverContents</WuiCode> functions
            to populate a matching schema&apos;s popover using a new component.
            You can see an example of this by clicking into one of the cells in
            the last column below.
          </p>
          <h2>Disabling expansion popovers</h2>
          <p>
            Often the popovers are unnecessary for short form content. In the
            example below we&apos;ve turned them off by setting{' '}
            <WuiCode language="js">isExpandable=false</WuiCode> on the boolean
            column.
          </p>
        </Fragment>
      ),
      components: { DataGridSchema },
      props: {
        WuiDataGrid,
        WuiDataGridInMemory,
        WuiDataGridColumn,
        WuiDataGridColumnActions,
        WuiDataGridColumnVisibility,
        WuiDataGridPaginationProps,
        WuiDataGridSorting,
        WuiDataGridCellValueElementProps,
        WuiDataGridSchemaDetector,
        WuiDataGridStyle,
        WuiDataGridToolBarVisibilityOptions,
      },
      demo: <DataGridSchema />,
    },
  ],
};
