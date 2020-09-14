import React, { useContext } from 'react';
import styled, { useKunTheme } from '@kun-ui/styled';
import ConfigContext, { OptionsObject } from './ConfigContext';
import { Snack } from './SnacbarProvider';
import { CollapseSlide } from '../transitions/CollapseSlide';
import clsx from 'clsx';
import Alert from '../Alert';
import { TransitionGroup } from 'react-transition-group';

const Wrap = styled.div`
  &.KunSnackbar-container-vertical-top {
    top: 20px;
    &.KunSnackbar-dense {
      top: 5px;
    }
  }
  &.KunSnackbar-container-vertical-bottom {
    bottom: 20px;
    flex-direction: column-reverse;
    top: unset;
    &.KunSnackbar-dense {
      bottom: 5px;
    }
  }
  &.KunSnackbar-container-horizontal-left {
    align-items: flex-start;
    left: 20px;
    transform: translateX(0);
    &.KunSnackbar-dense {
      left: 5px;
    }
  }
  &.KunSnackbar-container-horizontal-right {
    align-items: flex-end;
    right: 20px;
    left: unset;
    transform: translateX(0);
    &.KunSnackbar-dense {
      right: 5px;
    }
  }
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${p => p.theme.zIndex.snackbar};
  position: fixed;
  min-width: 228px;
  max-width: 100%;
  transition: top 300ms ease 0ms, right 300ms ease 0ms, bottom 300ms ease 0ms, left 300ms ease 0ms;
  .KunSnackbar-item {
    margin-top: 10px;
  }
  &.KunSnackbar-dense {
    .KunSnackbar-item {
      margin-top: 5px;
    }
  }
`;

/**
 * 所有消息的容器
 * @param Props
 */
const SnackbarContainer = ({ snacks }: { snacks: Snack[] }) => {
  const theme = useKunTheme();
  const {
    domRoot,
    content,
    autoHideDuration,
    maxSnack,
    dense,
    anchorOrigin,
    preventDuplicate,
    ...config
  } = useContext(ConfigContext);
  return (
    <Wrap
      className={clsx(
        'KunSnackbar-container',
        `KunSnackbar-container-vertical-${anchorOrigin.vertical}`,
        `KunSnackbar-container-horizontal-${anchorOrigin.horizontal}`,
        { 'KunSnackbar-dense': dense },
      )}
      theme={theme}
    >
      <TransitionGroup component={null}>
        {snacks.map(({ message, key, options }) => {
          const contentRender = options?.content || content;
          const snack = contentRender ? (
            typeof contentRender === 'function' ? (
              contentRender(key, message)
            ) : (
              content
            )
          ) : (
            <Alert>{message}</Alert>
          );
          const action = options.action || config.action;
          const actionElement =
            typeof action === 'function' ? action(key, message, options) : action;
          const onClose = (options.onClose || config.onClose)?.(key, message, options);
          const direction =
            anchorOrigin.horizontal !== 'center'
              ? anchorOrigin.horizontal
              : anchorOrigin.vertical === 'center'
              ? 'top'
              : anchorOrigin.vertical;
          return (
            <CollapseSlide
              key={key}
              timeout={{
                appear: 300,
                enter: 0,
                exit: 0,
              }}
              unmountOnExit
              direction={direction}
              movement="20px"
              className="KunSnackbar-item"
            >
              {React.cloneElement(snack as React.ReactElement, {
                ...config,
                ...options,
                action: actionElement,
                onClose,
              })}
            </CollapseSlide>
          );
        })}
      </TransitionGroup>
    </Wrap>
  );
};

export default SnackbarContainer;
