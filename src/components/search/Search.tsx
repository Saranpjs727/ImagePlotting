import * as React from "react";
import { Searchbar } from 'react-native-paper';
import {StyleSheet} from "react-native";


const Search = (): JSX.Element => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query) => {
        setSearchQuery(query)
    } ;

    return (
        <>
            {/*<SearchBar*/}
            {/*    placeholder="Type Here..."*/}
            {/*    onChangeText={onChangeSearch}*/}
            {/*    value={searchQuery}*/}
            {/*    style={styles.searchBar}*/}
            {/*/>*/}
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
                iconColor = {"black"}
            />
        </>


    )
}

const styles = StyleSheet.create({
    searchBar: {
        borderRadius: 30,
        borderColor: "black",
    }
});

export default Search;
