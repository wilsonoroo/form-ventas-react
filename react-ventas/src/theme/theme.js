import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
            main: 'rgba(0, 0, 0, 0.87)',
        },
        secondary: {
            main: '#f50057',
        },
        error: {
            main: red.A400
        }
    }
})



