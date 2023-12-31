import React, { useState } from 'react';

import { WuiSelect } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default () => {
  const options = [
    { value: 'option_one', text: 'Option one' },
    { value: 'option_two', text: 'Option two' },
    { value: 'option_three', text: 'Option three' },
  ];

  const [value, setValue] = useState(options[1].value);

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canPrepend canAppend canReadOnly={false}>
      <WuiSelect
        id="selectDocExample"
        options={options}
        value={value}
        onChange={e => onChange(e)}
        aria-label="Use aria labels when no actual label is in use"
      />
    </DisplayToggles>
  );
};
