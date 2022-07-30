import {Alert} from "react-native";

interface AlertDetails {
    navigation : any,
    message : string
}
export const ShowAlert = ({navigation, message}:AlertDetails) : any =>
    Alert.alert(
        "",
        ""+message,
        [
            { text: "OK", onPress: () => {navigation.navigate('BookDetail', {})}}
        ],
        {
            cancelable: true,
            onDismiss: () =>
                Alert.alert(
                    "This alert was dismissed by tapping outside of the alert dialog."
                ),
        }
    );


