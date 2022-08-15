import * as React from "react";
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import DashedLine from "react-native-dashed-line";

interface ModalDetails {
    item: any,
    onClickTick: any,
    isMini: boolean
}

const {width} = Dimensions.get('screen');

const SwipeModal = ({item, onClickTick, isMini}: ModalDetails): JSX.Element => {
    const lengthOfSteps = item.navigationSteps.length;
    return (
        <>
            <View style={styles.main}>
                {
                    isMini ?
                        <>
                            <Text style={styles.heading}>{item.floorName} {item.floorr}</Text>
                            <View style={styles.modalContainer}>
                                <><Text style={styles.details}>Have you reached {item.locationName}</Text>
                                    <View style={styles.options}>
                                        <View style={styles.closeIcon}>
                                            <Icon style={styles.close} name="close" size={25} color="red"
                                                  onPress={() => {
                                                  }}/>
                                        </View>
                                        <View style={styles.checkIcon}>
                                            <Icon style={styles.check} name="check" size={25} color="green"
                                                  onPress={onClickTick}
                                            />
                                        </View>
                                    </View></>
                            </View>
                        </>
                        :
                        <>
                            <View style={styles.navigationContainer}>
                                {
                                    item.navigationSteps.map((steps, index) => {
                                        return (
                                                <View style={styles.navigationStepMain} key={steps+"test"}>
                                                    <View style={styles.navigationStep} >
                                                        {
                                                            index == 0 ?
                                                                <Icon name="arrow-up" size={20} color="#373647"
                                                                      style={styles.arrowIcon}/>
                                                                :
                                                                <View style={{
                                                                    width: 20,
                                                                    height: 20,
                                                                    borderRadius: 20 / 2,
                                                                    backgroundColor: 'yellow',
                                                                    borderColor: 'white',
                                                                    borderWidth: 1
                                                                }}/>
                                                        }
                                                        <Text numberOfLines={1}
                                                              style={styles.navigationContent}>
                                                            Go To {steps}
                                                        </Text>
                                                    </View>
                                                    {
                                                        index != (lengthOfSteps - 1) ?
                                                            <>
                                                                <View style={styles.navigationStepDash}>
                                                                    <DashedLine
                                                                        axis="vertical"
                                                                        dashLength={6}
                                                                        dashThickness={2}
                                                                        dashGap={2}
                                                                        dashColor='#D3D3D3'
                                                                        dashStyle={{borderRadius: 1}}
                                                                    />
                                                                    <Text></Text>
                                                                </View>
                                                            </>
                                                            : <></>
                                                    }
                                                </View>
                                        )
                                    })
                                }
                            </View>
                        </>
                }
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        height: 200,
        width: width,
    },
    heading: {
        color: '#808080',
        fontSize: 15,
        lineHeight: 25,
        paddingLeft: (width / 2) / 2,
    },
    headingSteps: {
        color: '#808080',
        fontSize: 15,
        lineHeight: 25,
        paddingLeft: (width / 2) / 2,
        paddingTop: 20
    },
    modalContainer: {
        flex: 2,
        flexDirection: "row",
        paddingTop: 15,
        paddingLeft: 10,
        width: width
    },
    navigationStepMain: {
        flexDirection: "column",
    },
    navigationStep: {
        flexDirection: "row",
        paddingLeft: 40
    },
    navigationContainer: {
        display: "flex",
        flexDirection: "column",
        paddingTop: 40
    },
    navigationContent: {
        color: '#808080',
        fontSize: 15,
        lineHeight: 25,
        paddingLeft: 20
    },
    navigationStepDash: {
        flexDirection: "row",
        paddingLeft: 50,
        height: 50
    },
    details: {
        alignContent: "flex-start",
        justifyContent: "flex-start",
        color: 'black',
        fontSize: 15,
        lineHeight: 25,
        width: width - 100
    },
    options: {
        width: 100,
        flex: 2,
        display: "flex",
        flexDirection: "row",
        alignContent: "flex-end",
        position: "relative"
    },
    checkIcon: {
        height: 29,
        width: 29,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 50,
        marginRight: "auto"
    },
    check: {
        marginLeft: 0
    },
    closeIcon: {
        marginRight: "auto",
        height: 29,
        width: 29,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 50,
    },
    close: {
        marginLeft: 3,
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 23,
        elevation: 3,
        backgroundColor: 'red',
        marginTop: 30,
    },
    ExitText: {
        color: 'white'
    }
});

export default SwipeModal;

