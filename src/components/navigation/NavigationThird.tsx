import * as React from "react";
import {useEffect, useState} from "react";
import {Alert, Dimensions, Image, StyleSheet, View} from 'react-native';
import Modal from '../modal/Modal';
import images from "../../local-data/assets/imageLocation"
import {useNavigation} from "@react-navigation/native";
import {StackActions} from "@react-navigation/routers";


const {width, height} = Dimensions.get('screen');

interface NavigationProps {
    item: any;
}

const showAlert = (message: string, setIsRestartClicked: any, setIsExitClicked: any) =>
    Alert.alert(
        "",
        "" + message,
        [
            {
                text: "Restart", onPress: () => {
                    setIsRestartClicked(true);
                }
            },
            {text: 'Exit', onPress: () => setIsExitClicked(true)}
        ]
    );

const NavigationFirst = ({item}: NavigationProps): JSX.Element => {

    const [listIndex, setListIndex] = useState(2);
    const [isRestartClicked, setIsRestartClicked] = useState(false);
    const [isExitClicked, setIsExitClicked] = useState(false);
    const navigation = useNavigation();


    useEffect(() => {
        if (isRestartClicked) {
            navigation.dispatch(StackActions.pop(4));
            navigation.navigate('BookRoute');
        }
    }, [isRestartClicked])

    useEffect(() => {
        isExitClicked ? navigation.navigate('Favourites') : ""
    }, [isExitClicked])


    const onClickButton = () => {
        navigation.navigate('Feedback', {isReserved: false})
    }

    const onNoClick = () => {
        const val = "\t\t\t\t\t\t\t\tSorry for the Trouble!\n\nKindly restart from First or Contact \n\t\t\t\t\t\t\t\tthe Help Desk";
        showAlert(val, setIsRestartClicked, setIsExitClicked);
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
                    onNoClick={onNoClick}
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
