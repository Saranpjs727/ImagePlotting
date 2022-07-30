import * as React from "react";
import {useState} from "react";
import {Dimensions, StyleSheet} from "react-native";
import BookList from "../book/BookList";
import BookDetail from "../book/BookDetail";
import ScanScreen from "../qrCode/ScanScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer } from "@react-navigation/native";
// @ts-ignore
import bookData from "../../local-data/book.json";
import ImagePlotting from "../imagePlotting/ImagePlotting";
const { width } = Dimensions.get('screen');

const Header =():JSX.Element => {
    const [books, setBooks] = useState(bookData);
    const [searchedBook, setSearchedBook] = useState<any>([...books]);
    const Stack = createNativeStackNavigator();

    const onBookClick = (searchId: any) => {
        setSearchedBook(books.filter((book) => book.id == searchId)[0]);
    }

    return  (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Favourites">
                        {(props) => <BookList {...props} books = {books} onBookClick = {onBookClick}/>}
                    </Stack.Screen>
                    <Stack.Screen name="BookDetail" >
                        {(props) => <BookDetail {...props} item = {searchedBook}/>}
                    </Stack.Screen>
                    <Stack.Screen name="Scanner" >
                        {(props) => <ScanScreen {...props} item = {searchedBook}/>}
                    </Stack.Screen>
                    <Stack.Screen name="ImagePlotting" >
                        {(props) => <ImagePlotting {...props} item = {searchedBook}/>}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        width: width,
        paddingLeft:20,
        paddingTop:20,
    },
    arrow: {
       paddingLeft: width-140,
        paddingTop: 2
    },
    heading: {
        fontSize: 20,

    }
});
export default Header;
