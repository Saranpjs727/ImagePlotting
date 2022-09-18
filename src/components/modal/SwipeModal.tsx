import * as React from "react";
import {Dimensions, Pressable, StyleSheet, Text, View, Image} from 'react-native';
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
                                {/*<><Text style={styles.details}>Have you reached {item.locationName} ?</Text>*/}
                                {/*    <View style={styles.options}>*/}
                                {/*        <Pressable style={styles.buttonYes} onPress={onClickTick}>*/}
                                {/*            <Text style={styles.yesText}>Yes</Text>*/}
                                {/*        </Pressable>*/}
                                {/*        <Pressable style={styles.buttonNo} onPress={onClickNo}>*/}
                                {/*            <Text style={styles.noText}>No</Text>*/}
                                {/*        </Pressable>*/}
                                {/*    </View>*/}
                                {/*</>*/}
                                <Icon style={styles.cross} name="chevron-up" size={15} color="grey"
                                   onPress={onClickCross}/>
                                <Text style={styles.headingLocation}>Reach {item.locationName}</Text>
                                <View style={styles.modalContainerNew}>
                                    <><Text style={styles.detailsNew}>To Continue the Navigation</Text>
                                        <View style={styles.optionsNew}>
                                            <Pressable style={styles.buttonNew} onPress={onClickTick}>
                                                <Text style={styles.buttonTextNew}>Next</Text>
                                            </Pressable>
                                        </View></>
                                </View>
                            </View>
                        </>
                        :
                        <>
                            <View style={styles.navDet}>
                                <Icon style={styles.cross} name="chevron-down" size={15} color="grey"
                                      onPress={onClickCross}/>
                                <Text style={styles.navigationInfo}>Navigation Info </Text>
                                {/*<Icon style={styles.cross} name="times-circle-o" size={20} color="#373647"*/}
                                {/*      onPress={onClickCross}/>*/}
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
                                    {/*<><Text style={styles.details}>To continue the nav</Text>*/}
                                    {/*    <View style={styles.options}>*/}
                                    {/*        <Pressable style={styles.buttonYes} onPress={onClickTick}>*/}
                                    {/*            <Text style={styles.yesText}>Yes</Text>*/}
                                    {/*        </Pressable>*/}
                                    {/*        <Pressable style={styles.buttonNo} onPress={() => null}>*/}
                                    {/*            <Text style={styles.noText}>No</Text>*/}
                                    {/*        </Pressable>*/}
                                    {/*    </View>*/}
                                    {/*</>*/}
                                    <Text style={styles.headingLocation}>Reach {item.locationName}</Text>
                                    <View style={styles.modalContainerNew}>
                                        <><Text style={styles.detailsNew}>To Continue the Navigation</Text>
                                            <View style={styles.optionsNew}>
                                                <Pressable style={styles.buttonNew} onPress={onClickTick}>
                                                    <Text style={styles.buttonTextNew}>Next</Text>
                                                </Pressable>
                                            </View></>
                                    </View>
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
    headingLocation: {
        color: '#000000',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '700',
        paddingTop: 5,
       // paddingLeft: 10,
        fontFamily: 'Inter',
        fontStyle: 'normal'
    },
    modalContainerNew: {
        flexDirection: "row",
        paddingTop: 10,
        //paddingLeft: 10,
        width: width
    },
    detailsNew: {
        alignContent: "flex-start",
        justifyContent: "flex-start",
        color: 'black',
        fontSize: 14,
        lineHeight: 20,
        width: 190,
        fontWeight: '400',
        fontFamily: 'Inter',
        fontStyle: 'normal'
    },
    optionsNew: {
        flex: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        position: "relative",
        marginRight: 25
    },
    heading: {
        color: '#808080',
        fontSize: 15,
        lineHeight: 25,
        paddingLeft: (width / 2) / 2,
    },
    buttonNew: {
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
    },
    buttonTextNew: {
        position: 'absolute',
        color: '#FBFBFB'
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
        paddingLeft: 13,
        width: width,
    },
    modalContainer2: {
        flexDirection: "column",
        paddingTop: 35,
        paddingLeft: 13,
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
        paddingLeft: (width / 2),
    }
});

export default SwipeModal;
