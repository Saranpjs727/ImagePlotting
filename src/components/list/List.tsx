import * as React from "react";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import StarRating from "react-native-star-rating";
import images from "../../local-data/assets/images"

interface BookDetailsProps {
    books: any[],
    onBookClick: (id: bigint) => void,
    navigation: any
}

const List = ({books, navigation, onBookClick}: BookDetailsProps): JSX.Element => {

    return (
        <>
            <FlatList
                numColumns={1}
                keyExtractor={(item) => item.id.toString()}
                data={books}
                renderItem={({item}) => (
                    <View style={styles.bookMainContainer}>
                        <TouchableOpacity style={styles.bookContainer} onPress={() => {
                            onBookClick(item.id);
                            navigation.navigate('BookDetail', {})
                        }}>
                            <View>
                                <Image style={styles.bookImage} source={images[item.id]} testID="img1"/>
                            </View>
                            <View style={styles.bookDetails}>
                                <Text numberOfLines={1}
                                      style={styles.bookName}>{item.name} {item.name} {item.name}</Text>
                                <Text numberOfLines={1} style={styles.bookDet}>{item.year} | {item.publisher}</Text>
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
                        </TouchableOpacity>
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
        backgroundColor: '#F5F5F5',
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
        borderBottomColor: '#543088',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderRadius: 20
    },
    bookContainer: {
        flex: 3,
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20
    },
    bookImage: {
        width: 70,
        height: 100,
        resizeMode: 'stretch',
        borderRadius: 8
    },
    bookDetails: {
        paddingLeft: 20,
        flex: 3,
        flexDirection: "column"
    },
    bookName: {
        fontSize: 15,
        color: '#000000',
        fontWeight: 'bold'
    },
    bookDet: {
        fontSize: 12,
        marginTop: 3,
        color: '#5A5A5A'
    },
    bookRating: {
        marginTop: 3
    },
    starStyleContainer: {
        width: 20
    },
    starStyle: {
        marginTop: 10
    },
    bookIcon: {
        marginTop: 45
    },
    rating: {
        display: "flex",
        flexDirection: "row"
    },
    ratingText: {
        marginTop: 6.5,
        fontSize: 15,
        position: 'relative',
        color: '#5A5A5A'
    }

});

export default List;
