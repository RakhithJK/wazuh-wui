import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import format from 'html-format';

import { useView, Compiler, Placeholder } from 'react-view';
import { WuiSpacer, WuiTitle, WuiCodeBlock } from '../../../../src/components';
import Knobs from './knobs';

export default ({ config, setGhostBackground, playgroundClassName }) => {
  const getSnippet = code => {
    let regex = /return \(([\S\s]*?)(;)$/gm;
    let newCode = code.match(regex);

    if (newCode) {
      newCode = newCode[0];
      if (newCode.startsWith('return ('))
        newCode = newCode.replace('return (', '');
    } else {
      regex = /return ([\S\s]*?)(;)$/gm;
      newCode = code.match(regex)[0];
      if (newCode.startsWith('return '))
        newCode = newCode.replace('return ', '');
    }

    if (newCode.endsWith(');')) {
      newCode = newCode.replace(/(\);)$/m, '');
    }

    return format(newCode.trim(), ' '.repeat(4));
  };

  const Playground = () => {
    const [isGhost, setGhost] = useState(false);
    const params = useView(config);

    useEffect(() => {
      const { state } = params.knobProps;
      if (setGhostBackground) {
        let needGhostTheme = false;
        Object.keys(setGhostBackground).forEach(name => {
          if (state[name].value === setGhostBackground[name])
            needGhostTheme = true;
        });
        setGhost(needGhostTheme);
      }
    }, [params.knobProps]);

    const compilerClasses = classNames(
      'playgroundCompiler',
      {
        playgroundCompiler__ghostBackground: isGhost,
      },
      playgroundClassName
    );

    return (
      <React.Fragment>
        <WuiTitle>
          <h3>{config.componentName}</h3>
        </WuiTitle>
        <div className={compilerClasses}>
          <Compiler
            {...params.compilerProps}
            minHeight={62}
            placeholder={Placeholder}
          />
        </div>
        <WuiSpacer />

        <WuiCodeBlock language="html" fontSize="m" paddingSize="m" isCopyable>
          {getSnippet(params.editorProps.code)}
        </WuiCodeBlock>
        <WuiSpacer />

        <Knobs {...params.knobProps} />
        <WuiSpacer />
      </React.Fragment>
    );
  };

  return <Playground />;
};
