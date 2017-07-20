import createTheme from 'styled-components-theme'
import colors from '../constants/colors'

const theme = createTheme(...Object.keys(colors))
export default theme
