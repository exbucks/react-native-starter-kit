import { TextStyle } from 'react-native'
import { colors } from '../../../themes'

/**
 * All text will start off looking like this.
 */
const PRIMARY = {
  // fontFamily: 'Lato',
  color: colors.black,
}

export const SECONDARY = {
  // fontFamily: 'Roboto',
  color: colors.grey,
}

/**
 * All the variations of text styling within the app.
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  default: { ...PRIMARY, fontSize: 16 },

  pexlarge: { ...PRIMARY, fontSize: 20, fontWeight: '500' },
  plarge: { ...PRIMARY, fontSize: 18, fontWeight: '500' },
  pregular: { ...PRIMARY, fontSize: 16, fontWeight: '500' },
  pmedium: { ...PRIMARY, fontSize: 14, fontWeight: '500' },
  psmall: { ...PRIMARY, fontSize: 12, fontWeight: '500' },
  ptiny: { ...PRIMARY, fontSize: 10, fontWeight: '500' },

  slarge: { ...SECONDARY, fontSize: 18, fontWeight: '400' },
  sregular: { ...SECONDARY, fontSize: 16, fontWeight: '400' },
  smedium: { ...SECONDARY, fontSize: 14, fontWeight: '400' },
  ssmall: { ...SECONDARY, fontSize: 12, fontWeight: '400' },
  stiny: { ...SECONDARY, fontSize: 10, fontWeight: '400' },
}

