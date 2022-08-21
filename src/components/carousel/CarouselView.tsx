import * as React from "react";
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import image from "../../local-data/assets/imageLocations"
import Modal from '../modal/Modal';
import Carousel from 'react-native-snap-carousel';
import {useState} from "react";


const { width, height } = Dimensions.get('screen');

interface CarouselProps {
    item: any;
}

const CarouselView = ({item} : CarouselProps): JSX.Element => {

    let carousel;
    const [activeIndex, setActiveIndex] = useState(0);

    const _renderItem = ({item, index}) => {
        return (
            <View>
                <Image style={styles.image}  source={image[item]}  testID = "img1"/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.carousel}>
                <Carousel
                    ref={ref => carousel = ref}
                    data={item.noOfLocatedImages}
                    renderItem={_renderItem}
                    sliderWidth={width}
                    itemWidth={width}
                    onSnapToItem = { index => setActiveIndex(index) }
                />
            </View>
            <View style={styles.modal}>
                <Modal
                    type={"rounded-square"}
                    item={item}
                    onClickTick = {null}
                    isImagePlottingPage = {false}
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
    carousel:{
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
    image:{
        height: height - 300,
        width: width,
        resizeMode: 'cover',
    }
});

export default CarouselView;
