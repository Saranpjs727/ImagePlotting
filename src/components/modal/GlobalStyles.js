import {Dimensions, StyleSheet} from 'react-native';
const { width } = Dimensions.get('screen');

const GlobalStyles = StyleSheet.create({
    main:{
        //backgroundColor:'#D3D3D3',
        backgroundColor:'white',
        height: 200,
        width: width,
    },
    rounded:{
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderWidth: 1,
        borderColor: "#808080"
    },
});

export default GlobalStyles;
