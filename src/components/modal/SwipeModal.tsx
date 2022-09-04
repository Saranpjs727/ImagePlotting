import * as React from "react";
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import DashedLine from "react-native-dashed-line";
import Icon from "react-native-vector-icons/FontAwesome";

interface ModalDetails {
    item: any,
    onClickTick: any,
    isMini: boolean,
    onClickNo: any,
    onClickCross: any
}

const {width} = Dimensions.get('screen');

const SwipeModal = ({item, onClickTick, isMini, onClickNo, onClickCross}: ModalDetails): JSX.Element => {
    const lengthOfSteps = item.navigationSteps.length;
    return (
        <>
            <View style={styles.main}>
                {
                    isMini ?
                        <>
                            <View style={styles.modalContainer}>
                                <><Text style={styles.details}>Have you reached {item.locationName} ?</Text>
                                    <View style={styles.options}>
                                        <Pressable style={styles.buttonYes} onPress={onClickTick}>
                                            <Text style={styles.yesText}>Yes</Text>
                                        </Pressable>
                                        <Pressable style={styles.buttonNo} onPress={onClickNo}>
                                            <Text style={styles.noText}>No</Text>
                                        </Pressable>
                                    </View>
                                </>
                            </View>
                        </>
                        :
                        <>
                            <View style={styles.navDet}>
                                <Text style={styles.navigationInfo}>Navigation Info </Text>
                                <Icon style={styles.cross} name="times-circle-o" size={20} color="#373647"
                                      onPress={onClickCross}/>
                            </View>
                            <View style={styles.navigationContainer}>
                                {
                                    item.navigationSteps.map((steps, index) => {
                                        return (
                                            <View style={styles.navigationStepMain} key={steps + "test"}>
                                                <View style={styles.navigationStep}>
                                                    <View style={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: 10 / 2,
                                                        backgroundColor: '#FFFFFF',
                                                        borderColor: '#0B30E0',
                                                        borderWidth: 2,
                                                        top: 3
                                                    }}/>
                                                    <Text numberOfLines={1}
                                                          style={styles.navigationContent}>
                                                        {steps}
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
                                                                    dashColor='#0B30E0'
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
                                <View style={styles.modalContainer2}>
                                    <><Text style={styles.details}>Have you reached {item.locationName} ?</Text>
                                        <View style={styles.options}>
                                            <Pressable style={styles.buttonYes} onPress={onClickTick}>
                                                <Text style={styles.yesText}>Yes</Text>
                                            </Pressable>
                                            <Pressable style={styles.buttonNo} onPress={() => null}>
                                                <Text style={styles.noText}>No</Text>
                                            </Pressable>
                                        </View>
                                    </>
                                </View>
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
        height: 180,
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
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: 10,
        width: width,
    },
    modalContainer2: {
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 15,
        paddingLeft: 10,
        width: width,
        marginTop: 10
    },
    navigationStepMain: {
        flexDirection: "column",
    },
    navigationStep: {
        flexDirection: "row",
        paddingLeft: 20,
    },
    navigationContainer: {
        display: "flex",
        flexDirection: "column",
        paddingTop: 30
    },
    navigationContent: {
        color: '#000000',
        fontFamily: 'Inter',
        fontStyle: "normal",
        fontWeight: '400',
        fontSize: 12,
        paddingLeft: 15
    },
    navigationStepDash: {
        flexDirection: "row",
        paddingLeft: 24,
        height: 25
    },
    details: {
        alignContent: "center",
        justifyContent: "center",
        color: 'black',
        fontSize: 14,
        lineHeight: 17,
        fontFamily: 'Inter',
        fontStyle: "normal",
        fontWeight: '400',
        marginTop: 20,
        //width: width - 100
    },
    options: {
        width: 100,
        flex: 2,
        display: "flex",
        flexDirection: "row",
        alignContent: "flex-end",
        position: "relative",
        marginTop: 10
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
    },
    buttonYes: {
        width: 64,
        height: 29,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0B30E0',
        backgroundColor: '#0B30E0',
        marginTop: 5,
    },
    yesText: {
        position: 'absolute',
        color: '#FBFBFB'
    },
    buttonNo: {
        width: 64,
        height: 29,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0B30E0',
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        marginLeft: 10
    },
    noText: {
        position: 'absolute',
        color: '#0B30E0'
    },
    navigationInfo: {
        width: width - 120,
        height: 17,
        left: 20,
        top: 20,
        fontFamily: 'Inter',
        fontStyle: "normal",
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 17,
        color: 'black'
    },
    navDet: {
        display: 'flex',
        flexDirection: 'column'
    },
    cross: {
        marginLeft: 320
    }
});

export default SwipeModal;
