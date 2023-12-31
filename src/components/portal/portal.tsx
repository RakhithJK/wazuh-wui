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

/**
 * NOTE: We can't test this component because Enzyme doesn't support rendering
 * into portals.
 */

import React from 'react';
import { createPortal } from 'react-dom';
import { keysOf } from '../common';

interface InsertPositionsMap {
  after: InsertPosition;
  before: InsertPosition;
}

export const insertPositions: InsertPositionsMap = {
  after: 'afterend',
  before: 'beforebegin',
};

export const INSERT_POSITIONS: WuiPortalInsertPosition[] = keysOf(
  insertPositions
);

type WuiPortalInsertPosition = keyof typeof insertPositions;

interface WuiPortalProps {
  /**
   * ReactNode to render as this component's content
   */
  children: React.ReactNode;
  insert?: { sibling: HTMLElement; position: WuiPortalInsertPosition };
  portalRef?: (ref: HTMLDivElement | null) => void;
}

export class WuiPortal extends React.Component<WuiPortalProps> {
  portalNode: HTMLDivElement;
  constructor(props: WuiPortalProps) {
    super(props);

    const { insert } = this.props;

    this.portalNode = document.createElement('div');

    if (insert == null) {
      // no insertion defined, append to body
      document.body.appendChild(this.portalNode);
    } else {
      // inserting before or after an element
      const { sibling, position } = insert;
      sibling.insertAdjacentElement(insertPositions[position], this.portalNode);
    }
  }

  componentDidMount() {
    this.updatePortalRef(this.portalNode);
  }

  componentWillUnmount() {
    if (this.portalNode.parentNode) {
      this.portalNode.parentNode.removeChild(this.portalNode);
    }
    this.updatePortalRef(null);
  }

  updatePortalRef(ref: HTMLDivElement | null) {
    if (this.props.portalRef) {
      this.props.portalRef(ref);
    }
  }

  render() {
    return createPortal(this.props.children, this.portalNode);
  }
}
