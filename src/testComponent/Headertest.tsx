import * as React from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import BookList from "../book/BookList";
import BookDetail from "../book/BookDetail";
import {useState} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import ScanScreen from "../qrCode/ScanScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
const { width } = Dimensions.get('screen');


const Header =():JSX.Element => {

    const Stack = createNativeStackNavigator();

    const [isBookDetailViewClick, setIsBookDetailViewClick] = useState<boolean>(false);
    const [isBookListView, setIsBookListView] = useState<boolean>(true);
    const [isScannerViewEnabled, setIsScannerViewEnabled] = useState<boolean>(false);

    const onBookClick = (id: bigint) => {
        setIsBookDetailViewClick(true);
        setIsBookListView(false);
        setIsScannerViewEnabled(false);
    }

    const onHomeIconClick =() => {
        setIsBookDetailViewClick(false);
        setIsBookListView(true);
        setIsScannerViewEnabled(false);
    }

    const onClickNavigate = () => {
        setIsBookDetailViewClick(false);
        setIsScannerViewEnabled(true);
    }

    return  (
        <>
            {/*<View style={styles.header}>*/}
            {/*    <Text style={styles.heading}>Favourites</Text>*/}
            {/*    <Icon name="home" size={20} color="grey" style={styles.arrow} onPress={onHomeIconClick}/>*/}
            {/*</View>*/}
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Favourites">
                        {(props) => <BookList {...props} onBookClick= {onBookClick}/>}
                    </Stack.Screen>
                    <Stack.Screen name="BookDetail" >
                        {(props) => <BookDetail {...props} onClickNavigate= {onClickNavigate}/>}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
            {/*{isBookListView ? <BookList onBookClick={onBookClick}/> : <></>}*/}
            {/*{isBookDetailViewClick ? <BookDetail onClickNavigate = {onClickNavigate}/> : <></>}*/}
            {isScannerViewEnabled ? <ScanScreen/> : <></>}
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
