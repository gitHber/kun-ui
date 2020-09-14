import styled, { withKunTheme, css } from '@kun-ui/styled';
import { CloseFillCircle } from '@kun-ui/icons';

export const Clear = withKunTheme<HTMLOrSVGElement, React.SVGAttributes<HTMLOrSVGElement>>(
  styled(CloseFillCircle)`
    color: rgba(0, 0, 0, 0.3);
    cursor: text;
    opacity: 0;
    transition: opacity ${p => p.theme.transitions.duration.short}ms
      ${p => p.theme.transitions.easing.easeInOut} 0ms;
  `,
  'Kun-icon-clear',
);
