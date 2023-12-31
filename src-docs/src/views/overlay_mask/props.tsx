import React, { FunctionComponent, ReactNode } from 'react';
import { CommonProps } from '../../../../src/components/common';

interface WuiOverlayMaskInterface extends CommonProps {
  /**
   * Function that applies to clicking the mask itself and not the children
   */
  onClick?: () => void;
  /**
   * ReactNode to render as this component's children
   */
  children?: ReactNode;
  /**
   * Should the mask visually sit above or below the WuiHeader (controlled by z-index)
   */
  headerZindexLocation?: 'above' | 'below';
}

export const WuiOverlayMaskProps: FunctionComponent<WuiOverlayMaskInterface> = () => (
  <div />
);
