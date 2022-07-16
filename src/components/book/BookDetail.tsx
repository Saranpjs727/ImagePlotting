import * as React from "react";
import {Dimensions, Image, StyleSheet, Text, View, Pressable} from "react-native";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/FontAwesome";
import {useNavigation} from "@react-navigation/native";
const { width, height } = Dimensions.get('window');

interface BookDetailProps {
    onClickNavigate: () => void
}


const BookDetail = ({onClickNavigate}: BookDetailProps): JSX.Element => {

    const navigation = useNavigation();

    const description = 'A Transitional Reference provides A Transitional Reference providesA Transitional Reference provides a “crash course” in beginning pure mathematics, offering instruction on a blendof inductive and deductive reasoning offering instruction on a blendof inductive and deductive reasoning';

    return (
      <>
        <View style={styles.container}>
            <View style={styles.bookDetailsMain}>
                <Image  style={styles.bookImage} source = {require('./book.jpeg')}  testID = "img1"/>
                <Text numberOfLines= {1} style={styles.bookName}>Advances in Mathematics Advances in Mathematics Advances in Mathematics Advances in Mathematics </Text>
                <Text numberOfLines= {1} style={styles.bookDet}>2019  | Education</Text>
            </View>
            <View style={styles.starContainer}>
                <StarRating
                    maxStars = {5}
                    disabled = {true}
                    rating = {4}
                    fullStarColor = {'black'}
                    starSize= {15}
                    starStyle={styles.starStyle}
                />
            </View>
            <View style={styles.bookDetails}>
                <Text style={styles.bookHeading}>Description</Text>
                <Text numberOfLines={4} style={styles.bookDes}>{description}</Text>
            </View>
            <View>
                <Text style={styles.bookHeading}>Location</Text>
                <View style={styles.locationDetails}>
                    <Text numberOfLines={1} style={styles.bookLocation}>First Floor</Text>
                    <Icon name="arrow-right" size={20} color="#373647" style={styles.arrowIcon}/>
                    <Text style={styles.bookLocation}>Blue Zone</Text>
                </View>
            </View>
            <View style={styles.buttonContainer} >
                <Pressable style={styles.button}  onPress={() => { // @ts-ignore
                    navigation.navigate('Scanner')}}>
                    <Text>Navigate</Text>
                </Pressable>
            </View>
        </View>
      </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height-80,
        width: width,
        position: "relative",
        display:"flex",
        flexDirection: "column",
        elevation: 1,
        flexWrap: 'wrap',
        paddingLeft: 20,
        paddingRight: 20
    },
    bookDetailsMain:{
        alignItems: "center",
        marginTop:38
    },
    bookImage: {
        height: 210,
        width: 140,
        resizeMode: 'cover',
    },
    bookName:{
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 15,
    },
    bookDet: {
        fontSize: 14,
        marginTop:5
    },
    starContainer: {
        alignItems: 'center'
    },
    starStyle: {
        marginTop:20,
    },
    bookDetails:{
        marginTop:20,
        minHeight: 120
    },
    bookHeading : {
        fontSize: 14,
    },
    bookDes : {
        marginTop: 10,
        fontSize: 12,
        lineHeight: 18,
    },
    locationDetails: {
        marginTop: 10,
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center"
    },
    bookLocation : {
        fontSize: 14,
    },
    arrowIcon: {
        marginLeft: 10,
        marginRight: 10
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 23,
        elevation: 3,
        backgroundColor: '#e1e1e1',
        marginTop: 30
    }
});

export default BookDetail;
