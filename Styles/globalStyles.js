import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    borderRadius : {
        borderRadius: 19,
    },
    button: {
        position: 'absolute',
        backgroundColor: '#FEA52A',
        padding: 20,
        paddingVertical: 15,
        borderRadius: 5,
        right: 25,
        bottom: 25
    },
    center: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    cercle: {
        borderRadius: 1000,
    },
    demiInput: {
        height: 50,
        backgroundColor: '#FEA52A',
        minWidth: 10,
        width: 150,
        paddingVertical: 10,
        borderRadius: 100,
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    input: {
        backgroundColor: 'white',
        paddingLeft: 20,
        minWidth: 250,
        paddingVertical: 10,
        borderRadius: 1000,
        marginTop: 20,
    },
    mediumText: {
        fontFamily: 'sans-serif-light',
        fontSize: 17,
    },
    mediumCard: {

    },
    opacityWeak: {
        opacity: 0.3,
    },
    orangeShadows: {
        shadowColor: "#FEA52A",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 15,
    },
    shadows: {
        borderRadius: 19,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3.84,

        elevation: 5,
    },
    smallCard: {
        borderRadius: 19,
    },
    title: {
        fontFamily: 'sans-serif-light',
        fontSize: 25,
        marginLeft: 10,
        marginTop: 10,
    },
    white: {
        color: 'white',
    },
});

export default globalStyles;