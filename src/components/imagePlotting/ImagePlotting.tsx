import * as React from "react";
import {Alert, Dimensions, Image, StyleSheet, View} from 'react-native';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import {useEffect, useState} from "react";
import image from "../../local-data/assets/imageLocations"
import images from "../../local-data/assets/floorImage"
import Modal from './Modal';
import Carousel from 'react-native-snap-carousel';


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

    let carousel;
    const[isNavigationClicked, setIsNavigationClicked] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTickClicked, setIsTickClicked] = useState(false);
    const imageWidth =  width;
    const imageHeight = height - 250;

    useEffect(() =>{
       showAlert("Go to "+item.floorr+" to start Navigation", setIsNavigationClicked);
    }, [])


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
        ctx.arc(item.pointerStartingCoordinate.x, item.pointerStartingCoordinate.y, 9, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "#00FF00";
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        ctx.save();
    }

    const onClickTick = () =>{
        setIsTickClicked(true);
    }

    const _renderItem = ({item, index}) => {
        return (
            <View>
                <Image source={image[item]}  testID = "img1"/>
            </View>
        );
    }

    return (
            <View style={styles.container}>
                <View style={styles.canvas}>
                    {
                        !isTickClicked ? <Canvas ref={handleCanvas} />
                        :
                        <Carousel
                            ref={ref => carousel = ref}
                            data={item.noOfLocatedImages}
                            renderItem={_renderItem}
                            sliderWidth={width}
                            itemWidth={width}
                            onSnapToItem = { index => setActiveIndex(index) }
                        />
                    }
                </View>
                <View style={styles.modal}>
                    <Modal
                        type={"rounded-square"}
                        item={item}
                        onClickTick = {onClickTick}
                        isTickClicked = {isTickClicked}
                        activeIndex = {activeIndex}
                    />
                </View>
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
        height: height - 250
    },
    modal: {
        flex: 1,
        height: 250,
        backgroundColor: 'white',
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
});

export default ImagePlotting;
