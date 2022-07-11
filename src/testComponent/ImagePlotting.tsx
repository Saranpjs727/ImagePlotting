import * as React from "react";
import {Dimensions, Image , StyleSheet, Text, View} from 'react-native';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import imagePng from "./img1.png";


const { width, height } = Dimensions.get('screen');

const ImagePlotting = (): JSX.Element => {
    const handleCanvas = (canvas: any) => {
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'pink';
        ctx.fillRect(0, 0, width, height);


        //ctx.strokeRect(20,20,20,100);

        //ctx.fill(new Path2D("https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"));

        // @ts-ignore
        //const image = new Image();
        // @ts-ignore
        //image.src = document.getElementsByTagName("Image");

        //const img = React.createElement("img",{src:"./img1"},null);
        //const immg = Image.getSize("./img1", (width, height) => null ,null );
        const imageUri = Image.resolveAssetSource(imagePng).uri

        const image = new CanvasImage(canvas);
        image.src = imageUri;

        ctx.drawImage(image, 0, 0, width, height-100);
        image.addEventListener('load', () => {
            ctx.drawImage(image, 0, 0, 100, 100);
        });

        // ctx.strokeStyle = "blue";
        // ctx.lineWidth = 2;
        // ctx.beginPath();
        // ctx.moveTo(20,20);
        // ctx.lineTo(20,100);
        // ctx.lineTo(20,100);
        // ctx.lineTo(70, 100);
        // ctx.stroke();
    };

    return (
        <View style={styles.container}>
            <Text>Hello Saran!!!!</Text>
            <Canvas ref={handleCanvas}/>
            {/*<Image source = {require('./img1.png')}  testID = "img1"/>*/}
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
