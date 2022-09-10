import * as React from "react";
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const {width, height} = Dimensions.get('screen');


const Feedback = ({route}): JSX.Element => {

    const navigation = useNavigation();

    return (
        !route.params.isReserved ?
            <View style={styles.feedbackMain}>
                <Text style={styles.feedbackHeading}>Enjoy reading your book</Text>
                <Image style={styles.feedbackImage}
                       source={require('../../local-data/tick.gif')}
                />
                <Pressable style={styles.done} onPress={() => navigation.navigate('Favourites', {})}>
                    <Text style={styles.doneText}>Done
                    </Text>
                </Pressable>
            </View>
            :
            <View style={styles.feedbackMain}>
                <Text style={styles.feedbackHeading}>The book is reserved for you</Text>
                <Image style={styles.feedbackImage}
                       source={require('../../local-data/tick.gif')}
                />
                <Text style={styles.reservedHeading}>You will receive a mail once the book is returned. For more
                    queries <Text style={{color: '#4342DC'}}>Contact Us </Text>or <Text
                        style={{color: '#4342DC'}}>Email</Text>.</Text>
                <Pressable style={styles.doneReserved} onPress={() => navigation.navigate('Favourites', {})}>
                    <Text style={styles.doneTextReserved}>Done
                    </Text>
                </Pressable>
            </View>
    );
}

const styles = StyleSheet.create({
    feedbackMain: {
        width: width,
        height: height,
        backgroundColor: 'white'
    },
    feedbackHeading: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '400',
        paddingTop: 5,
        paddingLeft: (height / 2) / 5,
        fontFamily: 'Inter',
        fontStyle: 'normal'
    },
    reservedHeading: {
        color: '#5A5A5A',
        fontSize: 12,
        fontWeight: '400',
        fontHeight: 15,
        paddingTop: 5,
        fontFamily: 'Inter',
        fontStyle: 'normal',
        display: 'flex',
        width: width - 50,
        alignSelf: 'center',
    },
    feedbackImage: {
        width: width,
        height: height - 400
    },
    done: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#0B30E0',
        backgroundColor: '#FFFFFF',
        marginTop: 30,
        marginLeft: (height / 2) / 4
    },
    doneReserved: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#0B30E0',
        backgroundColor: '#4342DC',
        marginTop: 30,
        marginLeft: (height / 2) / 4
    },
    doneTextReserved: {
        color: 'white',
        fontWeight: '600'
    },
    doneText: {
        color: '#0B30E0',
    }
})

export default Feedback;
