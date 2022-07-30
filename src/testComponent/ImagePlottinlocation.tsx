import * as React from "react";
import {Alert, Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import locationImage from "../../local-data/image/library/location.jpeg";
import {useEffect, useState} from "react";
import images from "../../local-data/assets/floorImage"

const { width, height } = Dimensions.get('screen');


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

    useEffect(() =>{
        showAlert("Go to "+item.floorr+" to start Navigation", setIsNavigationClicked);
    }, [])


    const handleCanvas = (canvas: any) => {
        if (canvas !== null) {
            canvas.width = width;
            canvas.height = height - 250;
            let ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
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
            context.drawImage(image, 0, 0, width, height -100);
            context.save();
            location(canvas, context);
            onload(canvas, context, image);
        });

        image.src = imageUri;
        // highlight
        if(!isNavigationClicked){
            context.globalAlpha=.50;
            context.fillStyle="black";
            context.fillRect(0,0,width,height -100);
            context.restore();
        }
    }

    function location(canvas, ctx) {

        const imageUri = Image.resolveAssetSource(locationImage).uri
        const images = new CanvasImage(canvas);

        images.addEventListener('load', () => {
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.arc(89, 89, 12, 0, Math.PI * 2, true);
            ctx.drawImage(images,79,79,20, 20);
            ctx.stroke();
            ctx.save();

            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.arc(90, 390, 12, 0, Math.PI * 2, true);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.arc(300, 530, 12, 0, Math.PI * 2, true);
            ctx.drawImage(images,290,520,20, 20);
            ctx.stroke();
        })
        ctx.restore();
        images.src = imageUri;
        ctx.save();
    }

    return (
            <View style={styles.container}>
                <Canvas ref={handleCanvas} />
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
