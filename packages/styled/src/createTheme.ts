import { Theme } from './theming';
import deepmerge from './utils/deepmerge';

const values = { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 };
export const defaultTheme: Theme<typeof values> = {
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: values,
    up: key => `@media (minWidth: ${values[key]}px)`,
    down: key => `@media (maxWidth: ${values[key]}px)`,
    between: (start, end) => `@media (minWidth: ${values[start]}px, maxWidth: ${values[end]}px)`,
    width: key => `@media (width: ${values[key]}px)`,
  },
  palette: {
    type: 'light',
    primary: {
      main: '#198EEB',
      light: '#4FB1FF',
      dark: '#197BC9',
      light1: '#ECF8FF',
      dark1: '#D1EBFF',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#F5F5F5',
      light: '#FFF',
      dark: '#F0F0F0',
      light1: '#fff',
      dark1: '#f0f0f0',
      contrastText: '#666',
    },
    error: {
      main: '#F36969',
      light: '#FA8383',
      dark: '#D45353',
      light1: '#FFF4F2',
      dark1: '#f2d2ce',
      contrastText: '#FFF',
    },
    warning: {
      main: '#FF9B54',
      light: '#fbad75',
      dark: '#da8346',
      light1: '#FFFAF2',
      dark1: '#f2e3ce',
      contrastText: '#FFF',
    },
    success: {
      main: '#4ACFB1',
      light: '#6cdec4',
      dark: '#57b5a0',
      light1: '#ECFBFB',
      dark1: '#c6eae8',
      contrastText: '#FFF',
    },
    info: {
      main: '#45A8E6',
      light: '#5eb4ea',
      dark: '#459ad0',
      light1: '#F2FCFF',
      dark1: '#ceeaf2',
      contrastText: '#FFF',
    },
    question: {
      main: '#24BEE8',
      light: '#45caef',
      dark: '#21afd6',
      light1: '#F4FCFF',
      dark1: '#ceebf3',
      contrastText: '#FFF',
    },
    inherit: {
      main: 'inherit',
      light: 'inherit',
      dark: 'inherit',
      light1: 'rgba(0,0,0,.04)',
      dark1: 'rgba(255,255,255,.04)',
      contrastText: '#666',
    },
    text: {
      primary: '#333',
      secondary: '#666',
      hint: '#999',
    },
    background: {
      default: '#fff',
      level1: '#F4F5F6',
      level2: '#F5F7F8',
      level3: '#F9F9F9',
    },
    grey: {
      borderColor: '#dcdcdc',
      1: '#fff',
      2: '#F5F7F8',
      3: '#F8F8F8',
      4: '#F4F5F6',
      5: '#EEEEEE',
      6: '#F5F5F5',
      7: '#DCDCDC',
      8: '#C1C1C1',
      9: '#DBDBDB',
      10: '#979797',
      11: '#E8E8E8',
      12: '#F0F0F0',
      13: '#E6E6E6',
      14: '#B3B3B3',
      15: '#C1C1C1',
      16: '#FAFAFA',
    },
    divider: '#979797',
    disabled: '#ccc',
    link: {
      normal: '#3B8FD9',
      hover: '#0F6CB2',
      active: '#0F6CB2',
      visited: '#0F6CB2',
    },
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
    '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
    '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
    '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
    '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
    '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
    '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
    '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
    '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
    '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
    '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
    '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
    '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
  ],
  transitions: {
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      complex: 375,
      enteringScreen: 0, // 进入延迟
      leavingScreen: 0, // 离开延迟
      short: 250,
      shorter: 200,
      shortest: 150,
      standard: 300,
    },
  },
  shape: {
    borderRadius: 3,
  },
  typography: {
    title: 18,
    subtitle: 16,
    body1: 14,
    body2: 12,
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  spacing: ratio => ratio * 4,
};

const createTheme = (theme: Partial<Theme> = {}) => {
  return deepmerge(defaultTheme, theme);
};

export default createTheme;
