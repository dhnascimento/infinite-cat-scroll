import { extendTheme, theme as base } from '@chakra-ui/react'

const theme = extendTheme({
    styles: {
        global: (props) => ({
            'html, body': {
                backgroundColor: props.colorMode === 'dark' ? 'blue.800' : 'purple.50'
            }
        })
    },
    fonts: {
        heading: `Indie Flower, ${base.fonts?.heading}`,
        body: `Inter, ${base.fonts?.body}`
    },
})

export default theme