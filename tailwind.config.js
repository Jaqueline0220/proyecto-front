module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      primary: {
        DEFAULT: '#05396B',
      },
      secondary: {
        100: '#8DE4AF',
        DEFAULT: '#5CDB94',
        200: '#389583',
      },
      base: {
        DEFAULT: '#EDF5E1',
      },
      gray: {
        100: '#F2F2F2',
        200: '#AFAFAF',
        300: '#4D4D4D',
      },
      red: {
        DEFAULT: '#ff5f5f',
        800: '#681d1d',
      },
    },
    extends: {
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [],
};
