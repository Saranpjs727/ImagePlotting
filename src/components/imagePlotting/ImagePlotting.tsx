import * as React from "react";
import {Alert, BackHandler, Dimensions, Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import {useEffect, useState} from "react";
import images from "../../local-data/assets/floorImage"
import {useFocusEffect, useNavigation} from "@react-navigation/native";
const { width, height } = Dimensions.get('screen');
import SwipeUpDown from 'react-native-swipe-up-down';
import SwipeModal from "../modal/SwipeModal";

interface BookDetailProps {
    item: any;
}

const showAlert = (message: string, setIsNavigationClicked: any) =>
    Alert.alert(
        "",
        ""+message,
        [
            { text: "OK", onPress: () => {
                    setIsNavigationClicked(true);
                }
            }
        ]
    );

const ImagePlotting = ({item} : BookDetailProps): JSX.Element => {

    const[isNavigationClicked, setIsNavigationClicked] = useState(false);
    const imageWidth =  width;
    const imageHeight = height - 250;
    const navigation = useNavigation();

    useEffect(() =>{
       showAlert("Go to "+item.floorr+" to start Navigation", setIsNavigationClicked);
    }, [])



    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.navigate("Favourites");
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress); // detect back button press
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    const handleCanvas = (canvas: any) => {
        if (canvas !== null) {
            canvas.width = imageWidth;
            canvas.height = imageHeight;
            let ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, imageWidth, imageHeight);
            ctx.strokeStyle = "#00316E";
            ctx.lineWidth = 2;
            drawbackground(canvas, ctx, drawlines);
        }
    };

    function drawlines(canvas, ctx){
        ctx.beginPath();
        ctx.moveTo(item.startingCoordinate.x,item.startingCoordinate.y);
        item.pathCoordinates.map(pathCoordinates => {
            ctx.lineTo(pathCoordinates.x,pathCoordinates.y);
        })
        ctx.lineTo(item.endCoordinate.x,item.endCoordinate.y);
        ctx.stroke();
    }
    

    function drawbackground(canvas, context, onload){
        const imageUri = Image.resolveAssetSource(images[item.id]).uri
        const image = new CanvasImage(canvas);

        image.addEventListener('load', () => {
            context.drawImage(image, 0, 0, imageWidth, imageHeight);
            context.save();
            location(canvas, context);
            onload(canvas, context, image);
        });

        image.src = imageUri;

        // blurBackground
        if(!isNavigationClicked){
            context.globalAlpha=.50;
            context.fillStyle="black";
            context.fillRect(0,0,width,height -100);
            context.restore();
        }
    }

    function location(canvas, ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "#00FF00";
        ctx.fillStyle = "black";
        ctx.fillText("You are here", item.pointerStartingCoordinate.x+15, item.pointerStartingCoordinate.y+5);
        ctx.arc(item.pointerStartingCoordinate.x, item.pointerStartingCoordinate.y, 5, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "#00FF00";
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        ctx.save();
    }

    const onClickTick = () =>{
        navigation.navigate('BookView', {})
    }

    return (
            <View style={styles.container}>
                <View style={styles.canvas}>
                     <Canvas ref={handleCanvas} />
                </View>
                <SwipeUpDown
                    itemMini={
                        <SwipeModal
                            item={item}
                            onClickTick = {onClickTick}
                            isMini = {true}
                        />
                    }
                    itemFull={
                        <SwipeModal
                            item={item}
                            onClickTick = {onClickTick}
                            isMini = {false}
                        />
                    }
                    onShowMini={() => console.log('mini')}
                    onShowFull={() => console.log('full')}
                    animation="spring"
                    disableSwipeIcon = {false}
                    extraMarginTop={120}
                    iconColor='grey'
                    iconSize={30}
                    swipeHeight={170}
                    style={styles.swipeUp}
                />
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        position: "absolute",
        flex: 2,
        elevation: 1,
        backgroundColor: "white",
    },
    canvas:{
        width :  width,
        height: height - 250,
       // paddingLeft: 12,
       // paddingRight: 12
    },
    modal: {
        flex: 1,
        height: 250,
        backgroundColor: 'white',
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    swipeUp:{
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'grey',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    }
});

export default ImagePlotting;
