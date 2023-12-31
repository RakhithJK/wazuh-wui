import React, {
  useState,
  Fragment,
  FunctionComponent,
  ReactElement,
  ReactNode,
  useEffect,
} from 'react';

import { WuiFocusTrap } from '../../../../src/components/focus_trap';
import { WuiButton } from '../../../../src/components/button';

export const GuideFullScreen: FunctionComponent<{
  children: (setFullScreen: (isFullScreen: boolean) => void) => ReactElement;
  buttonText?: ReactNode;
  isFullScreen?: boolean;
  onOpen?: () => void;
}> = ({
  children,
  isFullScreen = false,
  buttonText = 'Show fullscreen demo',
  onOpen,
}) => {
  const [fullScreen, setFullScreen] = useState(isFullScreen);

  // Watch for fullScreen status and appropriately add/remove body classes for hiding scroll
  useEffect(() => {
    if (fullScreen) {
      document.body.classList.add('guideBody--overflowHidden');
    }
    return () => {
      document.body.classList.remove('guideBody--overflowHidden');
    };
  }, [fullScreen]);

  const openFullScreen = () => {
    setFullScreen(true);
    if (onOpen) {
      onOpen();
    }
  };

  return (
    <Fragment>
      <WuiButton onClick={openFullScreen} iconType="fullScreen">
        {buttonText}
      </WuiButton>

      {fullScreen && <WuiFocusTrap>{children(setFullScreen)}</WuiFocusTrap>}
    </Fragment>
  );
};
