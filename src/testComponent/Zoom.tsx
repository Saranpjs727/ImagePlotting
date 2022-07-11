import * as React from "react";
import {Dimensions, Image, StyleSheet, Text, View, Animated, Modal} from 'react-native';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import imagePng from "./img1.png";
import {PinchGestureHandler, State} from 'react-native-gesture-handler'


const { width, height } = Dimensions.get('screen');

const ImagePlotting = (): JSX.Element => {
    const handleCanvas = (canvas: any) => {
        canvas.width = width;
        canvas.height = height-100;
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'pink';
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        drawbackground(canvas, ctx, drawlines);
    };

    function drawlines(canvas, ctx){

        ctx.beginPath();
        ctx.moveTo(90,30);
        ctx.lineTo(90,400);
        ctx.lineTo(100,400);
        ctx.lineTo(100, 530);
        ctx.moveTo(100,530);
        ctx.lineTo(300,530);
        ctx.stroke();
    }

    function drawbackground(canvas, context, onload){

        const imageUri = Image.resolveAssetSource(imagePng).uri
        const image = new CanvasImage(canvas);

        image.addEventListener('load', () => {
            context.drawImage(image, 0, 0, width, height -100);
            onload(canvas, context);
        });

        image.src = imageUri;
    }

    // Zoom functionality

    const scale = React.useRef(new Animated.Value(1)).current;
    const handlePinch = Animated.event(
        [{
            nativeEvent: {scale}
        }],
        {
            useNativeDriver: false
        }
    );

    const onZoomStateChangeFunction=(event) => {
        if(event.nativeEvent.oldState == State.ACTIVE){
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true
            }).start()
        }
    }

    return (
            <View style={styles.container}>
                <Text>Hello Saran!!!!</Text>
                <Modal visible={true} animated>
                        < PinchGestureHandler
                            onGestureEvent = {handlePinch}
                            onHandlerStateChange = {onZoomStateChangeFunction}
                        >
                            <Animated.View>
                            <Animated.Image
                                source = {require('./img1.png')}
                                style={{ width: width, height:height, transform:[{scale}]}}
                                resizeMode={'contain'}
                            />
                            </Animated.View>

                        </PinchGestureHandler>
                </Modal>
               {/* <Canvas ref={handleCanvas}/>*/}
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        flex: 1,
        elevation: 1,
        backgroundColor: "grey"
    }
});

export default ImagePlotting;
