import ReactDOM from 'react-dom';
import React, { useState, useRef, useEffect } from 'react';
import Modal, { Props as ModalProps } from '../Modal';
import styled, { useKunTheme } from '@kun-ui/styled';
import clsx from 'clsx';
import { Close } from '@kun-ui/icons';
import { Zoom } from '../transitions/Zoom';

const DialogWrap = styled.div`
  background: #fff;
  box-shadow: ${p => p.theme.shadows[2]};
  border-radius: ${p => p.theme.shape.borderRadius}px;
`;
const DialogHeader = styled.div`
  position: relative;
  border-radius: ${p => p.theme.shape.borderRadius}px ${p => p.theme.shape.borderRadius}px 0 0;
  color: ${p => p.theme.palette.primary.contrastText};
  background-color: ${p => p.theme.palette.primary.main};
  padding: 12px 10px;
  min-width: 100px;
  .KunDialog-header-title {
    font-size: 14px;
    line-height: 14px;
  }
  .KunDialog-header-close {
    font-size: 13px;
    position: absolute;
    top: 12px;
    right: 18px;
    cursor: pointer;
  }
`;
const DialogBody = styled.div``;
const DialogTitle = styled.div``;

export interface Props extends ModalProps {
  title?: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
}

const Dialog = React.forwardRef<any, Props>(
  ({ children, title, className, style, ...props }, ref) => {
    const { open, onClose } = props;
    const theme = useKunTheme();

    return (
      <Modal ref={ref} {...props}>
        <Zoom in={open}>
          <DialogWrap theme={theme} className={clsx('KunDialog-root', className)} style={style}>
            <DialogHeader theme={theme} className="KunDialog-header">
              <DialogTitle theme={theme} className="KunDialog-header-title">
                {title}
              </DialogTitle>
              <Close className="KunDialog-header-close" onClick={onClose} />
            </DialogHeader>
            <DialogBody theme={theme} className="KunDialog-body">
              {children}
            </DialogBody>
          </DialogWrap>
        </Zoom>
      </Modal>
    );
  },
);

export default Dialog;
