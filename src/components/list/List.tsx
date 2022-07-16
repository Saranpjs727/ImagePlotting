import * as React from "react";
import {FlatList, Image, StyleSheet, View, Text, Alert} from "react-native"
import StarRating from "react-native-star-rating";
import Icon  from 'react-native-vector-icons/FontAwesome';

interface BookDetailsProps {
    books : any[],
    onBookClick: (id:bigint) => void,
    navigation: any
}

const List = ({onBookClick, books, navigation} : BookDetailsProps): JSX.Element => {

    return (
        <>
            <FlatList
                numColumns={1}
                keyExtractor={(item) => item.id.toString()}
                data={books}
                renderItem={({ item }) => (
                    <View style={styles.bookMainContainer}>
                        <View style={styles.bookContainer}>
                            <View>
                                <Image  style={styles.bookImage} source = {require('./book.jpeg')}  testID = "img1"/>
                            </View>
                            <View  style={styles.bookDetails} >
                                <Text numberOfLines={1} style={styles.bookName}>{item.name} {item.name} {item.name}</Text>
                                <Text numberOfLines={1} style={styles.bookDet}>{item.year} | {item.publisher}</Text>
                                <StarRating
                                    maxStars = {5}
                                    disabled = {true}
                                    rating = {item.rating}
                                    fullStarColor = {'black'}
                                    starSize= {15}
                                    containerStyle={styles.starStyleContainer}
                                    starStyle={styles.starStyle}
                                />
                            </View>
                            <Icon name="arrow-right" size={20} color="#373647"
                               onPress={() => {
                                   navigation.navigate('BookDetail', {onBookClick})}} style={styles.bookIcon}/>
                        </View>
                    </View>

                )}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    item: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 24,
        padding: 30,
        backgroundColor: 'grey',
        fontSize: 24,
    },
    bookMainContainer: {
        flex: 1,
        flexDirection: "column",
        marginBottom: 20,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    bookContainer: {
        flex: 3,
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight:20,
        marginBottom:20
    },
    bookImage: {
        width: 70,
        height: 100,
        resizeMode: 'cover'
    },
    bookDetails: {
        paddingLeft: 20,
        flex:3,
        flexDirection: "column"
    },
    bookName:{
        fontSize: 15
    },
    bookDet: {
        fontSize: 12,
        marginTop:3
    },
    bookRating: {
        marginTop:3
    },
    starStyleContainer:{
        width:30
    },
    starStyle: {
        marginTop:10
    },
    bookIcon: {
        marginTop:45
    }
});

export default List;
