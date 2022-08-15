import * as React from "react";
import {useState} from "react";
import {Dimensions, StyleSheet} from "react-native";
import BookList from "../book/BookList";
import BookDetail from "../book/BookDetail";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer } from "@react-navigation/native";
// @ts-ignore
import bookData from "../../local-data/book.json";
import ImagePlotting from "../imagePlotting/ImagePlotting";
import CarouselView from "../carousel/CarouselView";
const { width } = Dimensions.get('screen');
import { HeaderBackButton } from '@react-navigation/elements';


const Header =():JSX.Element => {
    const [books,] = useState(bookData);
    //const [searchedBook, setSearchedBook] = useState<any>([...books]);
    const [searchedBook, setSearchedBook] = useState<any>([...books][0]);
    const Stack = createNativeStackNavigator();

    const onBookClick = (searchId: any) => {
        setSearchedBook(books.filter((book) => book.id == searchId)[0]);
    }

    return  (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="BookRoute"  options={({ navigation }) => (
                             {   title: 'Book Path',
                                 headerLeft: (props) =>(
                            <HeaderBackButton {...props} onPress={() => navigation.popToTop()}/>
                        )})}>
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
