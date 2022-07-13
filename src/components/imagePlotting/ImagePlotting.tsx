import * as React from "react";
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import imagePng from "./library01.jpeg";
import {getAllBooks} from "../../services/BookService";


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
        getAllBooks().then((response) => {
           // alert(response.data.success);
        }).catch((reason) => {
            console.log(reason);
        })
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

    return (
            <View style={styles.container}>
                <Text>Hello Saran!!!!</Text>
                <Canvas ref={handleCanvas}/>
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
