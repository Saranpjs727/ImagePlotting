import {Component, useRef} from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Canvas from "react-native-canvas";
import * as React from "react";

const { width, height } = Dimensions.get('screen');

export default class CanvasRectangles extends Component {
    canvas: any;
    componentDidMount() {
        this.canvas.width = width;
        this.canvas.height = height;
        let context = this.canvas.getContext("2d");
        context.fillStyle = "red";

      //  context.fillRect(0, 0, this.canvas.width, this.canvas.height);

       // context.strokeRect.style="blue";
       //  context.moveTo(20,20);
       //  context.lineTo(20,100);
       //  context.stroke.style = "blue";
       //  context.stroke;
       // context.strokeRect(20, 20, 20, 100);

    };

    componentDidUpdate(props) {
        alert("hello"+ this.canvas.width);
        const context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        props.rectangles.map(rectangle => {
            const { x, y, height, width } = rectangle;
            context.strokeRect(x, y, width, height);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello Sharan</Text>
                <Canvas style={styles.canvas} ref={(canvas: any) => (this.canvas = canvas)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        flex: 1,
        elevation: 1,
        backgroundColor: "grey"
    },
    canvas: {
        backgroundColor: "pink"
    }
});
