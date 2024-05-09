//import liraries
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// create a component
const SearchInput = () => {
    return (
        <View>
            <View style={styles.inputWrapper}>
                <Icon name='ios-search' size={20} color='black' />
                <TextInput
                    style={styles.input}
                    placeholderTextColor='black'
                    placeholder='Search Contacts'
                />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    inputWrapper: {
        height: 40, width: '100%', borderRadius: 20, backgroundColor: 'gray',
        paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center',
    },
    input: {
        flex: 1, paddingLeft: 12, fontSize: 16, color: 'black'
    }
});

//make this component available to the app
export default SearchInput;