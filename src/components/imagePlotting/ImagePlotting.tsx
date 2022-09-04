import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Alert, BackHandler, Dimensions, Image, StyleSheet, View} from 'react-native';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import images from "../../local-data/assets/floorImage"
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import SwipeUpDown from 'react-native-swipe-up-down';
import SwipeModal from "../modal/SwipeModal";

const {width, height} = Dimensions.get('screen');

interface BookDetailProps {
    item: any;
}

const showAlert = (message: string, setIsNavigationClicked: any) =>
    Alert.alert(
        "",
        "" + message,
        [
            {
                text: "OK", onPress: () => {
                    setIsNavigationClicked(true);
                }
            }
        ]
    );

const ImagePlotting = ({item}: BookDetailProps): JSX.Element => {

    const [isNavigationClicked, setIsNavigationClicked] = useState(false);
    const imageWidth = width - 10;
    const imageHeight = height - 210;
    const navigation = useNavigation();
    const swipeUpDownRef = useRef();

    const onClickNo = () => {
        // @ts-ignore
        swipeUpDownRef.current.showFull()
    }

    const onClickCross = () => {
        // @ts-ignore
        swipeUpDownRef.current.showMini()
    }

    useEffect(() => {
        const val = "Kindly\n\nGo to the kiosk in the " + item.floorr + " to\n\t\t\t\t\t\t\t\tstart the NavigationFirst";
        showAlert(val, setIsNavigationClicked);
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
            ctx.strokeStyle = "#247CFF";
            ctx.lineWidth = 1;
            drawbackground(canvas, ctx, drawlines);
        }
    };

    function drawlines(canvas, ctx) {
        ctx.beginPath();
        ctx.setLineDash([2, 2]);
        ctx.moveTo(item.startingCoordinate.x, item.startingCoordinate.y);
        item.pathCoordinates.map(pathCoordinates => {
            ctx.lineTo(pathCoordinates.x, pathCoordinates.y);
        })
        ctx.lineTo(item.endCoordinate.x, item.endCoordinate.y);
        ctx.stroke();
    }


    function drawbackground(canvas, context, onload) {
        const imageUri = Image.resolveAssetSource(images[item.id]).uri
        const image = new CanvasImage(canvas);

        image.addEventListener('load', () => {
            context.drawImage(image, 0, 0, imageWidth, imageHeight);
            context.save();
            //location(canvas, context);
            onload(canvas, context, image);
        });

        image.src = imageUri;

        // blurBackground
        if (!isNavigationClicked) {
            context.globalAlpha = .50;
            context.fillStyle = "black";
            context.fillRect(0, 0, width, height - 100);
            context.restore();
        }
    }

    function location(canvas, ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "#00FF00";
        ctx.fillStyle = "black";
        ctx.fillText("You are here", item.pointerStartingCoordinate.x + 13, item.pointerStartingCoordinate.y + 5);
        ctx.arc(item.pointerStartingCoordinate.x, item.pointerStartingCoordinate.y, 5, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "#00FF00";
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        ctx.save();
    }

    const onClickTick = () => {
        navigation.navigate('NavigationFirst', {})
    }

    return (
        <View style={styles.container}>
            <View style={styles.canvas}>
                <Canvas ref={handleCanvas}/>
            </View>
            <SwipeUpDown
                itemMini={
                    <SwipeModal
                        item={item}
                        onClickTick={onClickTick}
                        isMini={true}
                        onClickNo={onClickNo}
                        onClickCross={onClickCross}
                    />
                }
                itemFull={
                    <SwipeModal
                        item={item}
                        onClickTick={onClickTick}
                        isMini={false}
                        onClickNo={onClickNo}
                        onClickCross={onClickCross}
                    />
                }
                onShowMini={() => console.log('mini')}
                onShowFull={() => console.log('full')}
                animation="spring"
                disableSwipeIcon={true}
                extraMarginTop={160}
                iconColor='grey'
                iconSize={30}
                swipeHeight={180}
                style={styles.swipeUp}
                ref={swipeUpDownRef}
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
    canvas: {
        width: width - 10,
        height: height - 210,
        paddingLeft: 5,
        paddingRight: 5
    },
    modal: {
        flex: 1,
        height: 250,
        backgroundColor: 'white',
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    swipeUp: {
        backgroundColor: 'white',
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        shadowColor: "black",
        // shadowOffset: {
        //     width: 5,
        //     height: 20,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        elevation: 20,
    }
});

export default ImagePlotting;
