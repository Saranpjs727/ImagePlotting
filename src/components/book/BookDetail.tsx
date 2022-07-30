import * as React from "react";
import {Dimensions, Image, StyleSheet, Text, View, Pressable} from "react-native";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/FontAwesome";
import {useNavigation} from "@react-navigation/native";
import images from "../../local-data/assets/images"
const { width, height } = Dimensions.get('window');

interface BookDetailProps {
    item: any;
}


const BookDetail = ({item} : BookDetailProps): JSX.Element => {

    const navigation = useNavigation();
    //const imgUrl =  require(''+item.img);

    return (
      <>
        <View style={styles.container}>
            <View style={styles.bookDetailsMain}>
                <Image  style={styles.bookImage} source={images[item.id]}  testID = "img1"/>
                <Text numberOfLines= {1} style={styles.bookName}>{item.name}</Text>
                <Text numberOfLines= {1} style={styles.bookDet}>{item.year} | {item.publisher}</Text>
            </View>
            <View style={styles.starContainer}>
                <StarRating
                    maxStars = {5}
                    disabled = {true}
                    rating = {item.rating}
                    fullStarColor = {'black'}
                    starSize= {15}
                    starStyle={styles.starStyle}
                />
            </View>
            <View style={styles.bookDetails}>
                <Text style={styles.bookHeading}>Description</Text>
                <Text numberOfLines={4} style={styles.bookDes}>{item.description}</Text>
            </View>
            <View>
                <Text style={styles.bookHeading}>Location</Text>
                <View style={styles.locationDetails}>
                    <Text numberOfLines={1} style={styles.bookLocation}>{item.floorr}</Text>
                    <Icon name="arrow-right" size={20} color="#373647" style={styles.arrowIcon}/>
                    <Text style={styles.bookLocation}>{item.zone}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer} >
                <Pressable style={styles.button}  onPress={() => { // @ts-ignore
                    navigation.navigate('Scanner')}}>
                    <Text style={styles.NavigateText}>Navigate</Text>
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
        color: '#808080'
    },
    bookDet: {
        fontSize: 14,
        marginTop:5,
        color: '#808080'
    },
    starContainer: {
        alignItems: 'center'
    },
    starStyle: {
        marginTop:20,
    },
    bookDetails:{
        marginTop:20,
        minHeight: 120,
    },
    bookHeading : {
        fontSize: 14,
        color: '#808080'
    },
    bookDes : {
        marginTop: 10,
        fontSize: 12,
        lineHeight: 18,
        color: '#808080'
    },
    locationDetails: {
        marginTop: 10,
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
    },
    bookLocation : {
        fontSize: 14,
        color: '#808080'
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
        marginTop: 30,
    },
    NavigateText:{
        color: '#808080'
    }
});

export default BookDetail;
