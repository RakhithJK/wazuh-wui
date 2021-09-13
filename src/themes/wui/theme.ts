/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { buildTheme, EuiThemeShape } from '../../services/theme';
import { animation } from '../../global_styling/variables/_animations';
import { breakpoint } from '../../global_styling/variables/_breakpoint';
import { base, size } from '../../global_styling/variables/_size';

import { colors_wui } from './global_styling/variables/_colors';
import { font_wui } from './global_styling/variables/_typography';
import { border_wui } from './global_styling/variables/_borders';

export const wuiThemeWazuh: EuiThemeShape = {
  colors: colors_wui,
  base,
  size,
  font: font_wui,
  border: border_wui,
  animation,
  breakpoint,
};

export const WuiThemeWazuh = buildTheme(wuiThemeWazuh, 'WUI_THEME_WAZUH');
