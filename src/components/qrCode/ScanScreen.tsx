'use strict';
import * as React from "react";

import {
    Alert,
    AppRegistry,
    StyleSheet,
    Text,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";

interface BookDetailProps {
    item: any;
}

const showAlert = (navigation:any, message: string, isBarCodeValidator : boolean) =>
    Alert.alert(
        "",
        ""+message,
        [
            { text: "OK", onPress: () => {
                    isBarCodeValidator ?
                        navigation.navigate('BookDetail', {}) :  ""
                }
            }
        ]
    );

const ScanScreen = ({item} : BookDetailProps): JSX.Element => {
    const[isBarcodeScanned, setIsBarcodeScanned] = useState(false);
    const navigation = useNavigation();
    let scanner;
    const onSuccess = e => {
        if(e.data.toLowerCase().toString() === item.qrcode){
            setIsBarcodeScanned(true);
            navigation.navigate('BookRoute', {})
        }else{
            showAlert(navigation, "Barcode is wrong. Kindly scan proper bar code", true);
        }
    };

    return (
        <>
            <QRCodeScanner
            ref = {(camera) => { scanner = camera }}
            vibrate = {false}
            fadeIn = {true}
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.off}
            topContent={
                <Text style={styles.centerText}>
                Scan the QR for the book location
                </Text>
            }
            containerStyle = {styles.containerStyle}
            />
        </>
    );
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    },
    containerStyle:{

    }
});

AppRegistry.registerComponent('default', () => ScanScreen);

export default ScanScreen;
