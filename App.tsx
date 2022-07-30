import * as React from "react";
import Header from "./src/components/header/Header";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImagePlotting from "./src/components/imagePlotting/ImagePlotting";
import BookDetail from "./src/components/book/BookDetail";

const App =():JSX.Element => {
    const Stack = createNativeStackNavigator();

    return  (
        <React.Fragment>
            {/*<NavigationContainer>*/}
            {/*    <Stack.Navigator>*/}
            {/*        <Stack.Screen name="Home" component={Header} />*/}
            {/*    </Stack.Navigator>*/}
            {/*</NavigationContainer>*/}
            <Header/>
        </React.Fragment>
    );
}

export default App;
