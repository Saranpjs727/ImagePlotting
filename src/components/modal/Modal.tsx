import * as React from "react";
import {useState} from "react";
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import GlobalStyles from './GlobalStyles';
import images from "../../local-data/assets/images"
import StarRating from "react-native-star-rating";

interface ModalDetails {
    type: string,
    item: any,
    onClickButton: any,
    listIndex: any
    onNoClick?: any
}

const {width} = Dimensions.get('screen');

const Modal = ({
                   type,
                   item,
                   onClickButton,
                   listIndex,
                   onNoClick
               }: ModalDetails): JSX.Element => {

    const [shapeClass,] = useState(type.split('-')[0])
    const navigationPath = item.navigationPath[listIndex]
    return (
        <>
            {
                listIndex === 2 ?
                    <View style={{...GlobalStyles.mainFinal, ...GlobalStyles[shapeClass]}}>
                        <View style={styles.bookDetailsMain}>
                            <Image style={styles.bookImage} source={images[item.id]} testID="img1"/>
                            <View style={styles.bookDetailsStyle}>
                                <Text numberOfLines={1} style={styles.bookName}>{item.name}</Text>
                                <Text numberOfLines={2} style={styles.bookDet}>{item.year} | {item.publisher}</Text>
                                <View style={styles.rating}>
                                    <StarRating
                                        maxStars={1}
                                        disabled={true}
                                        rating={1}
                                        fullStarColor={'#FFCF25'}
                                        starSize={15}
                                        containerStyle={styles.starStyleContainer}
                                        starStyle={styles.starStyle}
                                    />
                                    <Text style={styles.ratingText}>{item.rating}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.reference}>*Refer this image to find the book.</Text>
                        <Text
                            style={styles.heading}>{navigationPath.heading} {navigationPath.heading === '' ? '' : ':'}</Text>
                        <View style={styles.modalContainer}>
                            <><Text style={styles.details}>{navigationPath.content}</Text>
                                <View style={styles.options}>
                                    <Pressable style={styles.buttonNo} onPress={onNoClick}>
                                        <Text style={styles.buttonTextNo}>No</Text>
                                    </Pressable>
                                    <Pressable style={styles.button} onPress={onClickButton}>
                                        <Text style={styles.buttonText}>Yes</Text>
                                    </Pressable>
                                </View></>
                        </View>
                    </View>
                    :
                    <View style={{...GlobalStyles.main, ...GlobalStyles[shapeClass]}}>
                        <Text
                            style={styles.heading}>{navigationPath.heading}</Text>
                        <View style={styles.modalContainer}>
                            <><Text style={styles.details}>{navigationPath.content}</Text>
                                <View style={styles.options}>
                                    <Pressable style={styles.button} onPress={onClickButton}>
                                        <Text style={styles.buttonText}>{navigationPath.buttonText}</Text>
                                    </Pressable>
                                </View></>
                        </View>
                    </View>
            }
        </>
    );

}

const styles = StyleSheet.create({
    heading: {
        color: '#000000',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '700',
        paddingTop: 10,
        paddingLeft: 10,
        fontFamily: 'Inter',
        fontStyle: 'normal'
    },
    reference: {
        color: '#000000',
        fontSize: 13,
        lineHeight: 20,
        paddingTop: 5,
        paddingLeft: 10,
        fontFamily: 'Inter',
        fontStyle: 'normal'
    },
    modalContainer: {
        flex: 2,
        flexDirection: "row",
        //paddingTop: 5,
        paddingLeft: 10,
        width: width
    },
    details: {
        alignContent: "flex-start",
        justifyContent: "flex-start",
        color: 'black',
        fontSize: 14,
        lineHeight: 20,
        width: 190,
        fontWeight: '400',
        fontFamily: 'Inter',
        fontStyle: 'normal'
    },
    options: {
        width: 100,
        flex: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        position: "relative",
        marginRight: 15
    },
    checkIcon: {
        height: 29,
        width: 29,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 50,
        marginRight: "auto"
    },
    check: {
        marginLeft: 0
    },
    closeIcon: {
        marginRight: "auto",
        height: 29,
        width: 29,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 50,
    },
    close: {
        marginLeft: 3,
    },
    button: {
        width: 64,
        height: 29,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0B30E0',
        backgroundColor: '#0B30E0',
        marginLeft: 10
    },
    buttonText: {
        position: 'absolute',
        color: '#FBFBFB'
    },
    bookDetailsMain: {
        alignItems: "center",
        marginTop: 15,
        marginLeft: 10,
        display: "flex",
        flexDirection: "row"
    },
    bookImage: {
        height: 130,
        width: 90,
        resizeMode: 'stretch',
    },
    bookDetailsStyle: {
        display: "flex",
        flexDirection: "column",
        width: width - 100,
        marginLeft: 15,
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    bookName: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black'
    },
    bookDet: {
        fontSize: 14,
        marginTop: 7,
        color: '#5A5A5A',
        fontFamily: 'Inter',
        fontStyle: 'normal'
    },
    rating: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10
    },
    ratingText: {
        marginTop: 6.5,
        fontSize: 15,
        color: '#000000'
    },
    starStyleContainer: {
        width: 20
    },
    starStyle: {
        marginTop: 10
    },
    buttonNo: {
        width: 64,
        height: 29,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0B30E0',
        backgroundColor: '#FFFFFF',
    },
    buttonTextNo: {
        position: 'absolute',
        color: '#0B30E0'
    }
});

export default Modal;

