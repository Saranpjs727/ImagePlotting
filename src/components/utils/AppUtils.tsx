import * as React from "react";
import {Dimensions} from "react-native";
import {useEffect, useState} from "react";


const getScreenInfo = () => {
    const dim = Dimensions.get('window');
    return dim;
}

const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};

export const bindScreenDimensionsUpdate = (component) => {
alert("test");
    Dimensions.addEventListener('change', () => {
        try{
            component.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape',
                screenWidth: getScreenInfo().width,
                screenHeight: getScreenInfo().height
            });
        }catch(e){
            // Fail silently
        }
    });
}
