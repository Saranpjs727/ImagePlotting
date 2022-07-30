'use strict';
import * as React from "react";
import {useState} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity, View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {useNavigation} from "@react-navigation/native";



const ScanScreen = (): JSX.Element => {

    const navigation = useNavigation();
    let scanner;

    const onSuccess = e => {
        if(e.data.toLowerCase().toString() === 'library1'){
           // scanner.reactivate(false);
            //scanner._setScanning(false);
            navigation.navigate('ImagePlotting', {})
        }else{
            //scanner.reactivate(true);
            // scanner._setScanning(true);
            // alert("Barcode is wrong. Kindly scan proper bar code");
            // navigation.navigate('BookDetail', {})
            if(confirm("Barcode is wrong. Kindly scan proper bar code")) navigation.navigate('BookDetail', {});

        }
    };

    return (
        <>
            <QRCodeScanner
                ref = {(camera) => { scanner = camera }}
                //reactivate={false}
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.off}
                topContent={
                    <Text style={styles.centerText}>
                        Scan the QR for the book location
                    </Text>
                }
                // bottomContent={
                //     <TouchableOpacity style={styles.buttonTouchable}>
                //         <Text style={styles.buttonText}>OK. Got it!</Text>
                //     </TouchableOpacity>
                // }
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
    }
});

AppRegistry.registerComponent('default', () => ScanScreen);

export default ScanScreen;
