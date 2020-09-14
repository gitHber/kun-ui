import React from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { Transition } from 'react-transition-group';
import { useKunTheme } from '@kun-ui/styled';
import { useForkRef } from '@kun-ui/hooks';

const directionStyles = {
  left: ['translateX', '-'],
  right: ['translateX', ''],
  top: ['translateY', '-'],
  bottom: ['translateY', ''],
};

export interface SlideProps extends Omit<TransitionProps, 'children'> {
  children?: React.ReactElement<any, any>;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  movement?: string;
}

export const Slide = React.forwardRef<any, SlideProps>(
  ({ children, timeout, direction = 'top', movement = '10px', ...props }, ref) => {
    const styles = {
      entering: {
        opacity: 0,
        transform: `${directionStyles[direction][0]}(${directionStyles[direction][1]}${movement})`,
        visibility: 'hidden',
      },
      entered: { opacity: 1, transform: `translate(0,0)` },
      exiting: {
        opacity: 0,
        transform: `${directionStyles[direction][0]}(${directionStyles[direction][1]}${movement})`,
      },
      exited: {
        opacity: 0,
        transform: `${directionStyles[direction][0]}(${directionStyles[direction][1]}${movement})`,
        visibility: 'hidden',
      },
    };
    const theme = useKunTheme();
    // @ts-ignore
    const handleRef = useForkRef(ref, children.ref);
    const defaultTimeout = {
      appear: theme.transitions.duration.standard,
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };
    timeout = timeout === undefined ? defaultTimeout : timeout;
    return (
      <Transition appear timeout={timeout} {...props}>
        {(state, childProps) =>
          React.cloneElement(children, {
            style: {
              opacity: 0,
              transition: `all ${typeof timeout === 'object' ? timeout.appear : timeout}ms ${
                theme.transitions.easing.easeInOut
              }`,
              transform: `translate(0, 0)`,
              ...styles[state],
              ...children.props.style,
            },
            ref: handleRef,
            ...childProps,
          })
        }
      </Transition>
    );
  },
);
