import * as React from "react";
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const {width, height} = Dimensions.get('screen');

interface FeedbackProps {
    item: any;
}

const Feedback = ({item}: FeedbackProps): JSX.Element => {

    const navigation = useNavigation();

    return (
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
    doneText: {
        color: '#0B30E0',
    }
})

export default Feedback;
