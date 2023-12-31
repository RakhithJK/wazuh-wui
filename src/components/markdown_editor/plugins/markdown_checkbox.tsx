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

import React, { FunctionComponent, useContext } from 'react';
import { WuiCheckbox } from '../../form/checkbox';
import { WuiMarkdownContext } from '../markdown_context';
import { htmlIdGenerator } from '../../../services/accessibility';
import { WuiMarkdownAstNodePosition, RemarkTokenizer } from '../markdown_types';
import { Plugin } from 'unified';

interface CheckboxNodeDetails {
  type: 'checkboxPlugin';
  lead: string;
  label: string;
  isChecked: boolean;
}

const CheckboxParser: Plugin = function CheckboxParser() {
  const Parser = this.Parser;
  const tokenizers = Parser.prototype.blockTokenizers;
  const methods = Parser.prototype.blockMethods;

  const tokenizeCheckbox: RemarkTokenizer = function tokenizeCheckbox(
    eat,
    value,
    silent
  ) {
    /**
     * optional leading whitespace & single (dash or asterisk) mix
     * square brackets, optionally containing whitespace and `x`
     * optional whitespace
     * remainder of the line is consumed as the textbox label
     */
    const checkboxMatch = value.match(/^(\s*[-*]\s*)?\[([\sx]*)\](.+)/);
    if (checkboxMatch == null) return false;

    if (silent) {
      return true;
    }

    const [match, lead = '', checkboxStatus, text] = checkboxMatch;
    const isChecked = checkboxStatus.indexOf('x') !== -1;

    const now = eat.now();
    const offset = match.length - text.length;
    now.column += offset;
    now.offset += offset;
    const children = this.tokenizeInline(text, now);

    return eat(match)({
      type: 'checkboxPlugin',
      lead,
      label: text,
      isChecked,
      children,
    } as CheckboxNodeDetails);
  };

  tokenizers.checkbox = tokenizeCheckbox;
  methods.splice(methods.indexOf('list'), 0, 'checkbox'); // Run it just before default `list` plugin to inject our own idea of checkboxes.
};

const CheckboxMarkdownRenderer: FunctionComponent<CheckboxNodeDetails & {
  position: WuiMarkdownAstNodePosition;
}> = ({ position, lead, label, isChecked, children }) => {
  const { replaceNode } = useContext(WuiMarkdownContext);
  return (
    <WuiCheckbox
      id={htmlIdGenerator()()}
      checked={isChecked}
      label={children}
      onChange={() => {
        replaceNode(position, `${lead}[${isChecked ? ' ' : 'x'}]${label}`);
      }}
    />
  );
};

export { CheckboxParser as parser, CheckboxMarkdownRenderer as renderer };
