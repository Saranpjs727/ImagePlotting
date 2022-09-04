import * as React from "react";
import { Searchbar } from 'react-native-paper';
import {StyleSheet, Text} from "react-native";

interface SearchProps {
    searchQuery : string
    onChangeSearch : (query: string) => void
}

const Search = ({searchQuery, onChangeSearch}:SearchProps): JSX.Element => {

    return (
        <>
            <Searchbar
                placeholder= "Search your fav book"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
                iconColor = {"#9D9D9D"}
                keyboardType = "default"
            />
        </>

    )
}

const styles = StyleSheet.create({
    searchBar: {
        borderColor: "black",
        height:45,
        fontFamily: "Inter",
        fontStyle: "normal",
        fontSize:3,
        lineHeight: 15,
        color: "#9D9D9D",
        backgroundColor: "#FBFBFB"
    }
});

export default Search;
