'use strict';
import * as React from "react";
import {Component, useRef, useState} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity, View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import ImagePlotting from "../imagePlotting/ImagePlotting";



const ScanScreen = (): JSX.Element => {

    let scanner;
    const [isReactive, setIsReactive] = useState<boolean>(false);

    const onSuccess = e => {
        if(e.data.toLowerCase().toString() === 'library1'){
            setIsReactive(true);
           // scanner.reactivate(false);
            //scanner._setScanning(false);
        }else{
            //scanner.reactivate(true);
            // scanner._setScanning(true);
            alert(e.data+ " Barcode is wrong. Kindly scan proper bar code");
            setIsReactive(false);
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
                        Scan proper bar code to view the library map!!!
                    </Text>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}>OK. Got it!</Text>
                    </TouchableOpacity>
                }
            />
            {isReactive ? <ImagePlotting/> : <></>}
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
