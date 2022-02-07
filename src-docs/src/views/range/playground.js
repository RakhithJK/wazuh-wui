import { PropTypes } from 'react-view';
import { WuiRange, WuiDualRange } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
} from '../../services/playground';

export const rangeConfig = () => {
  const docgenInfo = Array.isArray(WuiRange.__docgenInfo)
    ? WuiRange.__docgenInfo[0]
    : WuiRange.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    type: PropTypes.String,
    value: '10',
  };

  propsToUse.onChange = {
    ...propsToUse.onChange,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onChange.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  propsToUse.tickInterval = {
    ...propsToUse.tickInterval,
    custom: {
      ...propsToUse.tickInterval.custom,
      checkDep: (val, state) => {
        if (state.showTicks.value && !val) {
          return 'When passing showTicks to WuiDualRange, you must also provide tickInterval';
        }
        return undefined;
      },
    },
  };

  propsToUse.showInput = {
    ...propsToUse.showInput,
    type: PropTypes.Boolean,
    value: false,
  };
  propsToUse.valueAppend = {
    ...propsToUse.valueAppend,
    type: PropTypes.String,
  };
  propsToUse.valuePrepend = {
    ...propsToUse.valuePrepend,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'WuiRange',
      props: propsToUse,
      scope: {
        WuiRange,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiRange'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const dualRangeConfig = () => {
  const docgenInfo = Array.isArray(WuiDualRange.__docgenInfo)
    ? WuiDualRange.__docgenInfo[0]
    : WuiDualRange.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    type: PropTypes.String,
    value: '10',
  };

  propsToUse.onChange = {
    ...propsToUse.onChange,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onChange.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  propsToUse.showInput = {
    ...propsToUse.showInput,
    type: PropTypes.Boolean,
    value: false,
  };

  propsToUse.tickInterval = {
    ...propsToUse.tickInterval,
    custom: {
      ...propsToUse.tickInterval.custom,
      checkDep: (val, state) => {
        if (state.showTicks.value && !val) {
          return 'When passing showTicks to WuiRange, you must also provide tickInterval';
        }
        return undefined;
      },
    },
  };

  return {
    config: {
      componentName: 'WuiDualRange',
      props: propsToUse,
      scope: {
        WuiDualRange,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiDualRange'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};
