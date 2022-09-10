import * as React from "react";
import {useState} from "react";
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Modal from '../modal/Modal';
import images from "../../local-data/assets/imageLocation"
import {useNavigation} from "@react-navigation/native";


const {width, height} = Dimensions.get('screen');

interface NavigationProps {
    item: any;
}

const NavigationFirst = ({item}: NavigationProps): JSX.Element => {

    const [listIndex, setListIndex] = useState(2);
    const navigation = useNavigation();

    const onClickButton = () => {
        navigation.navigate('Feedback', {isReserved : false})
    }

    return (
        <View style={styles.container}>
            <View style={styles.carousel}>
                <Image style={styles.image} source={images[item.navigationPath[listIndex].imageIndex]} testID="img1"/>
            </View>
            <View style={styles.modal}>
                <Modal
                    type={"default-square"}
                    item={item}
                    onClickButton={onClickButton}
                    listIndex={listIndex}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        position: "absolute",
        flex: 2,
        elevation: 1,
        backgroundColor: "white",
    },
    carousel: {
        width: width,
        height: height - 370
    },
    modal: {
        flex: 1,
        height: 250,
        backgroundColor: 'white',
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    image: {
        height: height - 210,
        width: width,
        resizeMode: 'stretch',
    }
});

export default NavigationFirst;
