import * as React from "react";
import {useState} from "react";
import {Dimensions, Image, Keyboard, Pressable, StyleSheet, Text, View} from "react-native";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/FontAwesome";
import {useNavigation} from "@react-navigation/native";
import images from "../../local-data/assets/images"
import {TextInput} from "react-native-paper";
import {DatePickerModal} from 'react-native-paper-dates';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {RangeChange} from "react-native-paper-dates/lib/typescript/Date/Calendar";

const {width, height} = Dimensions.get('window');

interface BookDetailProps {
    item: any;
}


const BookDetail = ({item}: BookDetailProps): JSX.Element => {

    const [reservedClicked, setReservedClicked] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const navigation = useNavigation();

    const [range, setRange] = React.useState<{
        startDate: Date | undefined;
        endDate: Date | undefined;
    }>({startDate: undefined, endDate: undefined});

    const [open, setOpen] = React.useState(false);

    const onDismiss = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirm = React.useCallback(
        ({startDate, endDate}) => {
            setOpen(false);
            setRange({startDate, endDate});
        },
        [setOpen, setRange]
    );


    let onFocus = (currentMode) => {
        Keyboard.dismiss();
        setOpen(true);
        setIsDateSelected(true);
        setIsVisible(false);
    }

    const onReserveClick = () => {
        if (reservedClicked && isDateSelected && range.startDate != undefined) {
            setIsVisible(false);
            navigation.navigate('Feedback', {isReserved: true, dateRange: range})
        }
        if (reservedClicked && range.startDate == undefined) {
            setIsVisible(true);
        }
        setReservedClicked(true);
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.bookDetailsMain}>
                    <Image style={styles.bookImage} source={images[item.id]} testID="img1"/>
                    <View style={styles.bookDetailsStyle}>
                        <Text numberOfLines={2} style={styles.bookName}>{item.name}</Text>
                        <Text numberOfLines={2} style={styles.bookDet}>{item.year} | {item.publisher}</Text>
                        <View style={styles.rating}>
                            <StarRating
                                maxStars={1}
                                disabled={true}
                                rating={1}
                                fullStarColor={'#FFCF25'}
                                starSize={15}
                                containerStyle={styles.starStyleContainer}
                                starStyle={styles.starStyle}
                            />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                        <View style={styles.bookStatus}>
                            {
                                (item.availableStatus === 'Available') ? <Image
                                        style={styles.mark}
                                        source={require('../../local-data/mark.png')}
                                    /> :
                                    <Image
                                        style={styles.mark}
                                        source={require('../../local-data/markNotAvailable.png')}
                                    />
                            }
                            <Text numberOfLines={2} style={styles.availableStatusStyle}>{item.availableStatus}</Text>
                            <Image
                                style={styles.info}
                                source={require('../../local-data/info.png')}
                            />
                        </View>
                        <Text></Text>
                    </View>
                </View>
                {
                    !reservedClicked ?
                        <View style={styles.bookDetails}>
                            <Text style={styles.bookHeading}>Description</Text>
                            <Text numberOfLines={7} style={styles.bookDes}>{item.description}</Text>
                        </View>
                        : <View style={styles.bookEmptyDetails}></View>
                }
                <View style={styles.bookLocationDet}>
                    <View style={styles.backgroundContainer}>
                        <Image
                            style={styles.circle}
                            source={require('../../local-data/circle.png')}
                            resizeMode='cover'
                        />
                    </View>
                    <Image
                        style={styles.circleLocation}
                        source={require('../../local-data/location.png')}
                    />
                    <Text style={styles.bookLocationDes}>Book Location</Text>
                </View>
                <View style={styles.locationDetails}>
                    <Text numberOfLines={1} style={styles.bookLocation}>{item.floorr}</Text>
                    <Icon name="arrow-right" size={20} color="#373647" style={styles.arrowIcon}/>
                    <Text style={styles.bookLocation}>{item.zone}</Text>
                </View>
                {
                    reservedClicked ?
                        <View>
                            <Text style={styles.bookLoaned}>The book is loaned till {item.loanedTill}, you will receive
                                a mail once the book is returned.</Text>
                            <Text style={styles.bookDateHeading}>Reserve the book</Text>
                            <TextInput style={styles.datePicker}
                                       keyboardType={'default'}
                                       outlineColor='#D9D9D9'
                                       activeOutlineColor='#D9D9D9'
                                       activeUnderlineColor='#D9D9D9'
                                       selectionColor='grey'
                                       underlineColor='#D9D9D9'
                                       placeholder='Select the reservation date'
                                       value={range.startDate ? range.startDate.toLocaleDateString() + " - " + range.endDate.toLocaleDateString() : ""}
                                       onFocus={onFocus}
                                       right={<TextInput.Icon name="calendar" color="#4342DC"/>}
                            />
                            <DatePickerModal
                                locale="en"
                                mode="range"
                                visible={open}
                                onDismiss={onDismiss}
                                startDate={new Date(item.loanedTillArray.year, item.loanedTillArray.month, item.loanedTillArray.date)}
                                endDate={range.endDate}
                                onConfirm={onConfirm}
                                validRange={{
                                    startDate: new Date(item.loanedTillArray.year, item.loanedTillArray.month, item.loanedTillArray.date),
                                    disabledDates: [new Date()]
                                }}
                            />
                            <Text style={{
                                display: isVisible ? 'flex' : 'none', color: 'red',
                                fontSize: 12,
                            }}>* Mandatory to select the date</Text>
                        </View>
                        : <View></View>
                }
            </View>
            {
                (item.availableStatus === 'Available')
                    ?
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.buttonDownload} disabled={true} onPress={() => null}>
                            <Text style={styles.DownloadText}>Online PDF <Icon name="download" size={12}
                                                                               color="#3D3D3D"/>
                            </Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={() => { // @ts-ignore
                            navigation.navigate('BookRoute')
                        }}>
                            <Text style={styles.NavigateText}>Navigate <Icon name="paper-plane" size={12}
                                                                             color="#FFFFFF"/></Text>
                        </Pressable>
                    </View>
                    :
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.buttonCancel} disabled={true} onPress={() => null}>
                            <Text style={styles.NavigateText}>Online PDF <Icon name="download" size={12}
                                                                               color="#FFFFFF"/>
                            </Text>
                        </Pressable>
                        <Pressable style={styles.buttonDownload} disabled={false} onPress={onReserveClick}>
                            <Text style={styles.DownloadText}>Reserve <Icon name="calendar" size={12}
                                                                            color="#3D3D3D"/></Text>
                        </Pressable>
                    </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height - 160,
        width: width,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        elevation: 1,
        flexWrap: 'wrap',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "white"
    },
    bookDetailsMain: {
        alignItems: "center",
        marginTop: 15,
        display: "flex",
        flexDirection: "row"
    },
    bookImage: {
        height: 210,
        width: 130,
        resizeMode: 'stretch',
    },
    bookName: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black'
    },
    bookDet: {
        fontSize: 14,
        marginTop: 7,
        color: '#5A5A5A',
        fontFamily: 'Inter',
        fontStyle: 'normal'
    },
    starContainer: {
        alignItems: 'center'
    },
    bookDetails: {
        marginTop: 25,
        minHeight: 120,
        borderBottomColor: '1px solid rgba(0, 0, 0, 0.03)',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderRadius: 5
    },
    bookEmptyDetails: {
        marginTop: 25
    },
    bookHeading: {
        fontSize: 14,
        color: '#000000',
        fontWeight: 'bold',
        marginTop: 5
    },
    bookDateHeading: {
        fontSize: 14,
        color: '#000000',
        fontWeight: 'bold',
        marginTop: 25
    },
    bookLocationDes: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 20
    },
    bookDes: {
        fontFamily: 'Open Sans',
        fontStyle: "normal",
        marginTop: 10,
        fontSize: 13,
        lineHeight: 29,
        color: '#808080',
        minHeight: 210
    },
    locationDetails: {
        paddingTop: 20,
        display: "flex",
        flexDirection: 'row',
        //justifyContent: 'center'
    },
    bookLocation: {
        fontSize: 14,
        color: '#2B2263',
        lineHeight: 17,
        fontWeight: '400'
    },
    arrowIcon: {
        marginLeft: 10,
        marginRight: 10
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        elevation: 30,
        backgroundColor: 'white',
        alignItems: "flex-start",
        paddingLeft: 20,
        paddingRight: 20,
        height: 80,
        paddingTop: 20,
    },
    button: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: '#0B30E0',
        // marginTop: 30,
        marginLeft: 20
    },
    buttonCancel: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: '#4342DC',
        // marginTop: 30,
        marginRight: 20
    },
    buttonDownload: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#0B30E0',
        backgroundColor: '#FFFFFF',
        //  marginTop: 30,
    },
    DownloadText: {
        color: '#3D3D3D',
    },
    NavigateText: {
        color: '#FFFFFF',
    },
    bookDetailsStyle: {
        display: "flex",
        flexDirection: "column",
        width: 180,
        marginLeft: 15,
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    rating: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10
    },
    ratingText: {
        marginTop: 6.5,
        fontSize: 15,
        color: '#000000'
    },
    starStyleContainer: {
        width: 20
    },
    starStyle: {
        marginTop: 10
    },
    availableStatusStyle: {
        marginLeft: 7,
        position: 'relative',
        color: '#5A5A5A'
    },
    mark: {
        height: 7,
        width: 7,
        marginTop: 7
    },
    bookStatus: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row"
    },
    info: {
        height: 14,
        width: 14,
        marginTop: 3,
        marginLeft: 7
    },
    circle: {
        width: 34,
        height: 34,
    },
    DownloadImage: {
        width: 6,
        height: 13
    },
    circleLocation: {
        width: 20,
        height: 25,
        marginLeft: 6,
        marginTop: 4,
        resizeMode: 'stretch',

    },
    bookLocationDet: {
        display: "flex",
        flexDirection: "row",
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    bookLoaned: {
        marginTop: 20,
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 15,
        color: '#5A5A5A',
    },
    reserveMandatoryText: {
        color: 'red',
        fontSize: 12,
    },
    datePicker: {
        width: width - 30,
        marginTop: 20,
        backgroundColor: '#D9D9D9',
        height: 45,
        borderRadius: 2,
        borderColor: '#D9D9D9'
    }
});

export default BookDetail;
