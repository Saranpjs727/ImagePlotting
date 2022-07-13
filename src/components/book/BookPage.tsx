import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import Search from "../search/Search";
import List from "../list/list";

const BookPage = (): JSX.Element => {

    return (
        <>
            <View style={styles.container}>
                <View>
                    <Text style={styles.heading}>Favourites</Text>
                </View>
                <View style={styles.searchBar}>
                    <Search/>
                    <List/>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 3,
        flexDirection:"column",
        elevation: 1,
        margin: 20
    },
    heading: {
        fontSize: 20,
        margin: 5
    },
    searchBar: {
        marginTop: 20,
        marginBottom: 20
    }
});

export default BookPage;
