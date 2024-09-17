import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GuidesLogo from '../assets/guides-logo.svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';

// API URL with /register endpoint
const apiUrl = 'http://guides.somee.com/api/Tourists/register';

export default function TouristSignUp() {
    const navigation = useNavigation();
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Country, setCountry] = useState('');
    const [DateOfBirth, setDateOfBirth] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        setDateOfBirth(date);
        hideDatePicker();
    };

    const btnRegister = () => {
        if (Password !== confirmPassword) {
            Alert.alert("Password Mismatch", "Passwords do not match.");
            return;
        }

        const touristData = {
            FirstName,
            LastName,
            Email,
            Password,
            PhoneNumber,
            Country,
            DateOfBirth: DateOfBirth ? DateOfBirth.toISOString().split('T')[0] : null, // Format the date
        };

        console.log('Sending registration request with:', touristData);

        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(touristData),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        })
            .then(async res => {
                console.log('Response status:', res.status);

                // Log response as JSON
                const resBody = await res.json();  // Only use json() once
                console.log('Response body:', resBody);

                if (res.status === 200 || res.status === 201) {
                    // Success: handle accordingly
                    Alert.alert('Registration Successful', 'You have successfully registered!');
                    navigation.navigate('HomePage');
                } else if (res.status === 400) {
                    throw new Error('Registration details not correct');
                } else if (res.status === 409) {
                    throw new Error('Email already exists');
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.log('Fetch error:', error);
                Alert.alert('Registration Failed', error.message);
            });
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <GuidesLogo width={128} height={128} style={styles.logo} />
                <Text style={styles.title}>Tourist Register</Text>

                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={FirstName}
                        onChangeText={setFirstName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={LastName}
                        onChangeText={setLastName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email ID"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={Email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={Password}
                        onChangeText={setPassword}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="phone" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={PhoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>

                {/* Date of Birth Input */}
                <TouchableOpacity style={styles.inputContainer} onPress={showDatePicker}>
                    <Icon name="calendar" size={20} color="#666" style={styles.inputIcon} />
                    <Text style={styles.dateText}>
                        {DateOfBirth ? DateOfBirth.toDateString() : "Date of Birth"}
                    </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                />

                {/* Country Input */}
                <View style={styles.inputContainer}>
                    <Icon name="globe" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Location"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={Country}
                        onChangeText={setCountry}
                    />
                </View>

                <TouchableOpacity style={styles.registerButton} onPress={btnRegister}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7', // Light background for a modern look
    },
    scrollContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingBottom: 50,
    },
    logo: {
        marginBottom: 30,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8, // For Android shadow
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        marginVertical: 10,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    inputIcon: {
        marginRight: 15,
        color: '#007BFF',
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
        paddingHorizontal: 10,
    },
    dateText: {
        flex: 1,
        height: 50,
        textAlignVertical: 'center',
        color: '#666',
        fontSize: 16,
    },
    registerButton: {
        width: '100%',
        height: 55,
        backgroundColor: '#007BFF',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
        paddingHorizontal: 15,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});
