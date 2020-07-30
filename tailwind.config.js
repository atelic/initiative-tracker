const black = '#232323';
const white = '#ffffff';
const red = '#f44336';
const orange = '#ff9800';
const yellow = '#ffca2b';
const green = '#00c853';
const lightBlue = '#4fc3f7';
const blue = '#1e88e5';
const indigo = '#3f51b5';
const purple = '#ab47bc';
const pink = '#e91e63';
const gray500 = '#9e9e9e';
const gray400 = '#aeaeb2';
const gray300 = '#c7c7cc';
const gray200 = '#d1d1d6';
const gray100 = '#e5e5ea';
const gray50 = '#f2f2f7';

const primary = '#51bded';
const secondary = '#e57200';
const tertiary = '#232d4b';

module.exports = {
  purge: {
    content: [
      './public/**/*.html',
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.jsx',
    ],
  },
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    screens: {
      sm: '600px',
      md: '1024px',
      lg: '1200px',
    },
    colors: {
      transparent: 'transparent',
      black,
      white,
    },
    backgroundColors: {
      transparent: 'transparent',
      black,
      white,
      red,
      orange,
      yellow,
      green,
      lightBlue,
      blue,
      indigo,
      purple,
      pink,
      gray500,
      gray400,
      gray300,
      gray200,
      gray100,
      gray50,
      primary,
      secondary,
      tertiary,
    },
    textColors: {
      black,
      white,
      red,
      orange,
      yellow,
      green,
      lightBlue,
      blue,
      indigo,
      purple,
      pink,
      gray500,
      gray400,
      gray300,
      gray200,
      gray100,
      gray50,
      primary,
      secondary,
      tertiary,
    },
    spacing: {
      0: '0',
      auto: 'auto',
      px: '1px',
      quarter: '.25rem',
      half: '.5rem',
      1: '1rem',
      '1-quarter': '1.25rem',
      '1-half': '1.5rem',
      2: '2rem',
      '2-half': '2.5rem',
      3: '3rem',
      '3-half': '3.5rem',
      4: '4rem',
      '4-half': '4.5rem',
      5: '5rem',
      10: '10rem',
    },
    backgroundColor: theme => theme('backgroundColors'),
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
    },
    borderColor: theme => ({
      ...theme('colors'),
      default: theme('colors.gray.300', 'currentColor'),
    }),
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '0.25rem',
      lg: '1rem',
      full: '9999px',
    },
    borderWidth: {
      default: '1px',
      0: '0',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    boxShadow: {
      default:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      none: 'none',
    },
    container: {},
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
    },
    fill: {
      current: 'currentColor',
    },
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },
    flexGrow: {
      0: '0',
      default: '1',
    },
    flexShrink: {
      0: '0',
      default: '1',
    },
    fontFamily: {
      base: [
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      medium: '0.995rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      mid: '1.5rem',
      '2xl': '1.6875rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '8xl': '5.5rem',
      bump: '1.25em',
      double: '2rem',
    },
    fontWeight: {
      hairline: '100',
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    height: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
    }),
    inset: {
      0: '0',
      auto: 'auto',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
    },
    margin: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing')),
    }),
    maxHeight: {
      full: '100%',
      screen: '100vh',
    },
    maxWidth: {
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      full: '100%',
    },
    minHeight: {
      0: '0',
      full: '100%',
      screen: '100vh',
    },
    minWidth: {
      0: '0',
      full: '100%',
    },
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    opacity: {
      0: '0',
      25: '0.25',
      50: '0.5',
      75: '0.75',
      100: '1',
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
    },
    padding: theme => theme('spacing'),
    stroke: {
      current: 'currentColor',
    },
    textColor: theme => theme('textColors'),
    width: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw',
    }),
    zIndex: {
      auto: 'auto',
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
    },
  },
  variants: {
    alignContent: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    appearance: false,
    backgroundAttachment: ['responsive'],
    backgroundColor: ['responsive', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: false,
    borderColor: ['responsive', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive'],
    boxShadow: ['responsive', 'hover', 'focus'],
    cursor: false,
    display: ['responsive'],
    fill: false,
    flex: ['responsive'],
    flexDirection: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    flexWrap: ['responsive'],
    float: ['responsive'],
    fontFamily: ['responsive'],
    fontSize: ['responsive'],
    fontSmoothing: false,
    fontStyle: ['responsive'],
    fontWeight: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    inset: false,
    justifyContent: ['responsive'],
    letterSpacing: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    objectFit: false,
    objectPosition: false,
    opacity: ['responsive'],
    order: ['responsive'],
    outline: false,
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: false,
    position: ['responsive'],
    resize: false,
    stroke: false,
    tableLayout: false,
    textAlign: ['responsive'],
    textColor: ['responsive', 'hover', 'focus'],
    textDecoration: ['responsive', 'hover', 'focus'],
    textTransform: ['responsive'],
    userSelect: false,
    verticalAlign: false,
    visibility: ['responsive'],
    whitespace: false,
    width: ['responsive'],
    wordBreak: false,
    zIndex: ['responsive'],
  },
  corePlugins: {},
  plugins: [],
};
