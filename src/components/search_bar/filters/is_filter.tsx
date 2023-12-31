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

import React, { Component } from 'react';
import { WuiFilterButton } from '../../filter_group';
import { isNil } from '../../../services/predicate';
import { Query } from '../query';
import { Clause } from '../query/ast';

export interface IsFilterConfigType {
  type: 'is';
  field: string;
  name: string;
  negatedName?: string;
  available?: () => boolean;
}

export interface IsFilterProps {
  index: number;
  config: IsFilterConfigType;
  query: Query;
  onChange: (value: Query) => void;
}

export class IsFilter extends Component<IsFilterProps> {
  resolveDisplay(clause: Clause) {
    const { name, negatedName } = this.props.config;
    if (isNil(clause)) {
      return { hasActiveFilters: false, name };
    }
    return Query.isMust(clause)
      ? { hasActiveFilters: true, name }
      : {
          hasActiveFilters: true,
          name: negatedName ? negatedName : `Not ${name}`,
        };
  }

  valueChanged(field: string, checked: boolean) {
    const query = checked
      ? this.props.query.removeIsClause(field)
      : this.props.query.addMustIsClause(field);
    this.props.onChange(query);
  }

  render() {
    const { query, config } = this.props;
    const clause = query.getIsClause(config.field);
    const checked = !isNil(clause);
    const { hasActiveFilters, name } = this.resolveDisplay(clause);
    const onClick = () => {
      this.valueChanged(config.field, checked);
    };
    return (
      <WuiFilterButton
        onClick={onClick}
        hasActiveFilters={hasActiveFilters}
        aria-pressed={!!hasActiveFilters}>
        {name}
      </WuiFilterButton>
    );
  }
}
