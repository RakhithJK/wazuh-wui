/*
 * Copyright 2022 Wazuh Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * NOTICE: THIS FILE HAS BEEN MODIFIED BY WAZUH INC UNDER COMPLIANCE WITH THE APACHE 2.0 LICENSE FROM THE ORIGINAL WORK
 * OF THE COMPANY Elasticsearch B.V.
 *
 * THE FOLLOWING IS THE COPYRIGHT OF THE ORIGINAL DOCUMENT:
 *
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useEffect } from 'react';
import { WuiSpacer } from '../spacer';
import { WuiTablePagination } from '../table';
import {
  ItemsPerPageChangeHandler,
  PageChangeHandler,
} from '../table/table_pagination/table_pagination';

export interface Pagination {
  pageIndex: number;
  pageSize: number;
  totalItemCount: number;
  pageSizeOptions?: number[];
  hidePerPageOptions?: boolean;
}

export interface PaginationBarProps {
  pagination: Pagination;
  /**
   * id of the table being controlled
   */
  'aria-controls'?: string;
  onPageSizeChange: ItemsPerPageChangeHandler;
  onPageChange: PageChangeHandler;
}

export const defaults = {
  pageSizeOptions: [10, 25, 50],
};

export const PaginationBar = ({
  pagination,
  'aria-controls': ariaControls,
  onPageSizeChange,
  onPageChange,
}: PaginationBarProps) => {
  const pageSizeOptions = pagination.pageSizeOptions
    ? pagination.pageSizeOptions
    : defaults.pageSizeOptions;
  const pageCount = Math.ceil(pagination.totalItemCount / pagination.pageSize);

  useEffect(() => {
    if (pageCount < pagination.pageIndex + 1) {
      onPageChange(pageCount - 1);
    }
  }, [pageCount, onPageChange, pagination]);

  return (
    <div>
      <WuiSpacer size="m" />
      <WuiTablePagination
        activePage={pagination.pageIndex}
        hidePerPageOptions={pagination.hidePerPageOptions}
        itemsPerPage={pagination.pageSize}
        itemsPerPageOptions={pageSizeOptions}
        pageCount={pageCount}
        onChangeItemsPerPage={onPageSizeChange}
        onChangePage={onPageChange}
        aria-controls={ariaControls}
      />
    </div>
  );
};
