import * as React from "react";
import {FlatList,Text, StyleSheet, View} from "react-native"
import {useState} from "react";

const List = (): JSX.Element => {
    const [people, setPeople] = useState([
        { name: 'shaun', id: '1' },
        { name: 'yoshi', id: '2' },
        { name: 'mario', id: '3' },
        { name: 'luigi', id: '4' },
        { name: 'peach', id: '5' },
        { name: 'toad', id: '6' },
        { name: 'bowser', id: '7' },
    ]);
    return (
        <>
            <FlatList
                numColumns={1}
                keyExtractor={(item) => item.id}
                data={people}
                renderItem={({ item }) => (
                    <Text style={styles.item}>{item.name}</Text>
                )}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    item: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 24,
        padding: 30,
        backgroundColor: 'grey',
        fontSize: 24,
    },
});

export default List;
