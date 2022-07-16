import * as React from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import Search from "../search/Search";
import List from "../list/List";
import {useState} from "react";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');


interface BookPageProps {
    onBookClick: (id:bigint) => void
}

const BookList = ({onBookClick}: BookPageProps): JSX.Element => {
    const navigation = useNavigation();

    const [searchQuery, setSearchQuery] = React.useState('');
    const [isBookSearched, setIsBookSearched] = React.useState<boolean>(false);
    const [books, setBooks] = useState([
        { id: 1, img: 'book', year: '2019', publisher: 'Education',rating : 4, name: 'Advances in Mathematics'},
        { id: 2, img: 'book', year: '2020', publisher: 'Education',rating : 2, name: 'Advances in Mathematics'},
        { id: 3, img: 'book', year: '2021', publisher: 'Education',rating : 5, name: 'Advances in React'},
        { id: 4, img: 'book', year: '2023', publisher: 'Education',rating : 4, name: 'Advances in Program'},
        { id: 5, img: 'book', year: '2018', publisher: 'Education',rating : 4, name: 'Advances in Cloud'},
        { id: 6, img: 'book', year: '2019', publisher: 'Education',rating : 2, name: 'Advances in Database'}
    ]);

    const onChangeSearch = (query: any) => {
        setIsBookSearched(true);
        setSearchQuery(query);
    } ;

    const filteredBook = !isBookSearched
        ? books
        : books.filter((book) =>
            book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.rating.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <>
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <Search
                        searchQuery = {searchQuery}
                        onChangeSearch = {onChangeSearch}/>
                </View>
                <View style={styles.list}>
                    <List
                        books ={filteredBook}
                        onBookClick = {onBookClick}
                        navigation={ navigation}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height-80,
        width: width,
        position: "relative",
        flex: 2,
        display:"flex",
        flexDirection:"column",
        elevation: 1
    },
    searchBar: {
        paddingLeft: 20,
        paddingRight:20,
        marginTop: 22
    },
    list: {
        marginTop: 35,
        marginBottom: 20,
        height: 550,
    }
});

export default BookList;
