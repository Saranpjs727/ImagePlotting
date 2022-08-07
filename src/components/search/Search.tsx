import * as React from "react";
import { Searchbar } from 'react-native-paper';
import {StyleSheet} from "react-native";

interface SearchProps {
    searchQuery : string
    onChangeSearch : (query: string) => void
}

const Search = ({searchQuery, onChangeSearch}:SearchProps): JSX.Element => {

    return (
        <>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
                iconColor = {"black"}
                keyboardType = "default"
            />
        </>

    )
}

const styles = StyleSheet.create({
    searchBar: {
        borderRadius: 30,
        borderColor: "black",
        height:45
    }
});

export default Search;
