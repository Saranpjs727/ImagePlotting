import * as React from "react";
import {useState} from "react";
import {Dimensions, StyleSheet} from "react-native";
import BookList from "../book/BookList";
import BookDetail from "../book/BookDetail";
import ScanScreen from "../qrCode/ScanScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer } from "@react-navigation/native";
const { width } = Dimensions.get('screen');


const Header =():JSX.Element => {

    const Stack = createNativeStackNavigator();

    const [isScannerViewEnabled, setIsScannerViewEnabled] = useState<boolean>(false);


    const onBookClick = (id: bigint) => {
        setIsScannerViewEnabled(false);
    }

    const onHomeIconClick =() => {
        setIsScannerViewEnabled(false);
    }

    const onClickNavigate = () => {
        setIsScannerViewEnabled(true);
    }

    return  (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Favourites">
                        {(props) => <BookList {...props} onBookClick= {onBookClick}/>}
                    </Stack.Screen>
                    <Stack.Screen name="BookDetail" >
                        {(props) => <BookDetail {...props} onClickNavigate= {onClickNavigate}/>}
                    </Stack.Screen>
                    <Stack.Screen name="Scanner" component={ScanScreen}/>
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
