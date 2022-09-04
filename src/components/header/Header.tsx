import * as React from "react";
import {useState} from "react";
import {Dimensions, StyleSheet} from "react-native";
import BookList from "../book/BookList";
import BookDetail from "../book/BookDetail";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
// @ts-ignore
import bookData from "../../local-data/book.json";
import ImagePlotting from "../imagePlotting/ImagePlotting";
import {HeaderBackButton} from '@react-navigation/elements';
import NavigationFirst from "../navigation/NavigationFirst";
import NavigationThird from "../navigation/NavigationThird";
import NavigationSecond from "../navigation/NavigationSecond";
import Feedback from "../feedback/Feedback";

const {width} = Dimensions.get('screen');


const Header = (): JSX.Element => {
    const [books, setBooks] = useState(bookData);
    const [searchedBook, setSearchedBook] = useState<any>([...books]);
    const Stack = createNativeStackNavigator();

    const onBookClick = (searchId: any) => {
        setSearchedBook(books.filter((book) => book.id == searchId)[0]);
    }

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator /*screenOptions={{headerTitleAlign: 'center'}}*/>
                    <Stack.Screen name="Favourites" options={{
                        title: 'Favourites',
                        headerStyle: {backgroundColor: 'white'},
                        headerShadowVisible: false
                    }}>
                        {(props) => <BookList {...props} books={books} onBookClick={onBookClick}/>}
                    </Stack.Screen>
                    <Stack.Screen name="BookDetail" options={{
                        title: 'Favourites',
                        headerStyle: {backgroundColor: 'white'},
                        headerShadowVisible: false
                    }}>
                        {(props) => <BookDetail {...props} item={searchedBook}/>}
                    </Stack.Screen>
                    <Stack.Screen name="BookRoute" options={({navigation}) => (
                        {
                            title: searchedBook.floorr,
                            headerStyle: {backgroundColor: 'white'},
                            headerShadowVisible: false,
                            headerLeft: (props) => (
                                <HeaderBackButton {...props} onPress={() => navigation.popToTop()}/>
                            )
                        })}>
                        {(props) => <ImagePlotting {...props} item={searchedBook}/>}
                    </Stack.Screen>
                    <Stack.Screen name="NavigationFirst" options={{
                        title: '',
                        headerStyle: {backgroundColor: 'white'},
                        headerShadowVisible: false
                    }}>
                        {(props) => <NavigationFirst {...props} item={searchedBook}/>}
                    </Stack.Screen>
                    <Stack.Screen name="NavigationSecond" options={{
                        title: '',
                        headerStyle: {backgroundColor: 'white'},
                        headerShadowVisible: false
                    }}>
                        {(props) => <NavigationSecond {...props} item={searchedBook}/>}
                    </Stack.Screen>
                    <Stack.Screen name="NavigationThird" options={{
                        title: '',
                        headerStyle: {backgroundColor: 'white'},
                        headerShadowVisible: false
                    }}>
                        {(props) => <NavigationThird {...props} item={searchedBook}/>}
                    </Stack.Screen>
                    <Stack.Screen name="Feedback" options={{
                        title: '',
                        headerStyle: {backgroundColor: 'white'},
                        headerShadowVisible: false
                    }}>
                        {(props) => <Feedback {...props} item={searchedBook}/>}
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
        paddingLeft: 20,
        paddingTop: 20,
    },
    arrow: {
        paddingLeft: width - 140,
        paddingTop: 2
    },
    heading: {
        fontSize: 20,

    }
});
export default Header;
