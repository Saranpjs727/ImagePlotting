import * as React from "react";
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import { useState } from 'react';
import GlobalStyles from './GlobalStyles';
import Icon from "react-native-vector-icons/FontAwesome";

interface ModalDetails {
    type: string,
    item: any,
    onClickTick: any,
    isTickClicked: boolean,
    activeIndex: any
}

const { width } = Dimensions.get('screen');

const Modal = ({type, item, onClickTick, isTickClicked, activeIndex}:ModalDetails): JSX.Element => {

    const [shapeClass,]=useState(type.split('-')[0])

    return (
        <>
            <View style= {{...GlobalStyles.main,...GlobalStyles[shapeClass]}}>
                <Text style={styles.heading}>{item.floorName} {item.floorr}</Text>
                <View style={styles.modalContainer}>
                    {!isTickClicked ?
                        <><Text style={styles.details}>Have you reached {item.locationName}</Text>
                        <View style={styles.options}>
                            <Icon style={styles.check} name="check-circle-o" size={25} color="green"
                                  onPress={onClickTick}
                            />
                            <Icon style={styles.close} name="close" size={25} color="red"
                                  onPress={() => {
                                  }}/>
                        </View></>
                        :
                        (activeIndex == 0) ? <Text style={styles.details}>Go to the Aisle and Swipe Right</Text> :
                            <Text style={styles.details}>Swipe Left</Text>
                    }
                </View>
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    heading: {
        color: '#808080',
        fontSize: 15,
        lineHeight: 25,
        paddingTop: 10,
        paddingLeft: (width/2)/2
    },
    modalContainer:{
        flex: 2,
        flexDirection: "row",
        paddingTop: 15,
        paddingLeft: 10,
        width: width
    },
    details: {
        alignContent: "flex-start",
        justifyContent: "flex-start",
        color: 'black',
        fontSize: 15,
        lineHeight: 25,
        width: width-100
    },
    options:{
        width: 100,
        flex: 2,
        display: "flex",
        flexDirection: "row",
        alignContent: "flex-end",
        position: "relative"
    },
    check:{
        display:"flex",
        width: 50,
        alignItems:"flex-end",
        justifyContent:"flex-end",
        marginRight: "auto"
    },
    close:{
        width: 50,
        marginRight: "auto"

    }
});

export default Modal;

