import {createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette:{
        primary: {
            light: "#fff",
            main: "#000080",
            dark: "#2D2D2D",
            contrastText: "#fff"
          },
    },
    typography:{
        h2:{
            fontSize:13,
            fontFamily: 'Krona One, sans-serif',
            padding:10,
            color:'white'
        },
        h3:{
            fontSize:13,
            fontFamily: 'Krona One, sans-serif',
            padding:10,
            color:'white',
            border:'solid 2px blue',
            borderRadius:20,
            backgroundColor:'white'
        },
    }
})

export default theme;