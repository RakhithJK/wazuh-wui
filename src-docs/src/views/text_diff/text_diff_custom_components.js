import React from 'react';

import { useWuiTextDiff, WuiCodeBlock } from '../../../../src/components';

export default () => {
  const beforeText =
    'Orbiting this at a distance of roughly ninety-two million miles is an utterly insignificant little blue green planet whose ape- descended life forms are so amazingly primitive that they still think digital watches are a pretty neat idea.';
  const afterText =
    'Orbiting those at a distance of roughly ninety-nine billion yards is not insignificant dwaf red green planet whose ape- ascended life forms are so amazingly primitive that they still think digital clocks are a pretty neat idea.';
  const [rendered] = useWuiTextDiff({
    beforeText,
    afterText,
    insertComponent: 'strong',
    deleteComponent: 's',
  });

  return (
    <WuiCodeBlock fontSize="m" paddingSize="m">
      {rendered}
    </WuiCodeBlock>
  );
};
