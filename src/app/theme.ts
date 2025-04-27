import { css } from '@emotion/react'

const textVariant = (size: `${number}px`, weight: number) => css`
  font-size: ${size};
  font-weight: ${weight};
`

export const Color = {
  white: '#FFFFFF',
  black: '#000000',
  red: '#C8102E',
  gray900: '#333333',
  gray800: '#474747',
  gray700: '#5B5B5B',
  gray600: '#6F6F6F',
  gray500: '#838383',
  gray400: '#979797',
  gray300: '#ABABAB',
  gray200: '#BFBFBF',
  gray100: '#D3D3D3',
  gray50: '#F0F0F0',
} as const

export const FontSize = { 
  title_xl: '36px',
  title_lg: '28px',
  title_md: '22px',
  title_sm: '16px',
  body_lg: '17px',
  body_md: '14px',
  body_sm: '12px',
  body_xs: '8px',
} as const

export const FontWeight = {
  title_xl: 700,
  title_lg: 700,
  title_md: 700,
  title_sm: 400,
  body_lg: 700,
  body_md: 400,
  body_sm: 400,
  body_xs: 400,
} as const

export const FontVariant = {
  title_xl: textVariant(FontSize.title_xl, FontWeight.title_xl),
  title_lg: textVariant(FontSize.title_lg, FontWeight.title_lg),
  title_md: textVariant(FontSize.title_md, FontWeight.title_md),
  title_sm: textVariant(FontSize.title_sm, FontWeight.title_sm),
  body_lg: textVariant(FontSize.body_lg, FontWeight.body_lg),
  body_md: textVariant(FontSize.body_md, FontWeight.body_md),
  body_sm: textVariant(FontSize.body_sm, FontWeight.body_sm),
  body_xs: textVariant(FontSize.body_xs, FontWeight.body_xs),
} as const

export const Padding = {
  x: '8px',
  y: '4px',
} as const

export const Radius = {
  sm: '4px',
  md: '12px',
} as const

export const ScreenSize = {
  sm: '576px',
  md: '784px', // Navbar looks weird below 784px
  lg: '992px',
  xl: '1200px',
  max: '1400px',
} as const

interface LinearlyScaleSizeParams {
  minScreenSizePx: number
  minSizePx: number
  maxScreenSizePx: number
  maxSizePx: number
}

/* Refer to https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/ for the math*/
/* TODO: Specify the return value type of this function*/
export const linearlyScaleSize = ({
  minScreenSizePx,
  minSizePx,
  maxScreenSizePx,
  maxSizePx,
}: LinearlyScaleSizeParams) => {
  return `clamp(${minSizePx}px, calc(${minSizePx}px + ${minSizePx} / ${maxScreenSizePx - minScreenSizePx} * (100vw - ${minScreenSizePx}px)), ${maxSizePx}px)`
}
