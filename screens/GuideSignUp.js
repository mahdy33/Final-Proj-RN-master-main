// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Switch, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import GuidesLogo from '../assets/guides-logo.svg';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { useNavigation } from '@react-navigation/native';

// // API URL for guide registration
// const apiUrl = 'http://guides.somee.com/api/GuidesRW';

// export default function GuideSignUp() {
//     const navigation = useNavigation();
//     const [FirstName, setFirstName] = useState('');
//     const [LastName, setLastName] = useState('');
//     const [Bio, setBio] = useState('');
//     const [Country, setCountry] = useState('');
//     const [HasCar, setHasCar] = useState(false);
//     const [AverageRating, setAverageRating] = useState(0);  // Optional field
//     const [Password, setPassword] = useState('');
//     const [ConfirmPassword, setConfirmPassword] = useState('');  // New Confirm Password Field
//     const [PhoneNumber, setPhoneNumber] = useState('');
//     const [Email, setEmail] = useState('');
//     const [Languages, setLanguages] = useState('');
//     const [DateOfBirth, setDateOfBirth] = useState(null);
//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//     // Date picker controls
//     const showDatePicker = () => setDatePickerVisibility(true);
//     const hideDatePicker = () => setDatePickerVisibility(false);
//     const handleConfirmDate = (date) => {
//         setDateOfBirth(date);
//         hideDatePicker();
//     };

//     // Function to validate and submit the form
//     const btnRegister = () => {
//         if (Password !== ConfirmPassword) {
//             Alert.alert("Password Mismatch", "Passwords do not match.");
//             return;
//         }

//         // Prepare the guide data for submission
//         const guideData = {
//             FirstName,
//             LastName,
//             Bio,
//             Country,
//             HasCar,
//             AverageRating: AverageRating || null,  // If not set, send null
//             Password,
//             PhoneNumber,
//             Email,
//             DateOfBirth: DateOfBirth ? DateOfBirth.toISOString().split('T')[0] : null,  // Format the date
//             Languages,  // Languages as a single string, no array needed
//         };

//         console.log('Sending registration request with:', guideData);

//         // Submit the form via fetch
//         fetch(apiUrl, {
//             method: 'POST',
//             body: JSON.stringify(guideData),
//             headers: new Headers({
//                 'Content-Type': 'application/json; charset=UTF-8',
//                 'Accept': 'application/json; charset=UTF-8',
//             })
//         })
//             .then(res => {
//                 console.log('Response status:', res.status);
//                 if (res.status === 200 || res.status === 201) {
//                     return res.json();
//                 } else if (res.status === 400) {
//                     throw new Error('Registration details not correct');
//                 } else {
//                     throw new Error('Network response was not ok');
//                 }
//             })
//             .then(result => {
//                 console.log('API response:', result);
//                 navigation.navigate('HomePageGuide');
//             })
//             .catch(error => {
//                 console.log('Fetch error:', error);
//                 Alert.alert('Registration Failed', error.message);
//             });
//     };

//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//             style={styles.container}
//         >
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <GuidesLogo width={128} height={128} style={styles.logo} />
//                 <Text style={styles.title}>Guide Register</Text>

//                 <View style={styles.inputContainer}>
//                     <Icon name="user" size={20} color="#666" style={styles.inputIcon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="First Name"
//                         autoCapitalize="none"
//                         autoCorrect={false}
//                         value={FirstName}
//                         onChangeText={setFirstName}
//                     />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <Icon name="user" size={20} color="#666" style={styles.inputIcon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Last Name"
//                         autoCapitalize="none"
//                         autoCorrect={false}
//                         value={LastName}
//                         onChangeText={setLastName}
//                     />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <Icon name="info-circle" size={20} color="#666" style={styles.inputIcon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Bio"
//                         autoCapitalize="none"
//                         autoCorrect={false}
//                         value={Bio}
//                         onChangeText={setBio}
//                     />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <Icon name="globe" size={20} color="#666" style={styles.inputIcon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Country"
//                         autoCapitalize="none"
//                         autoCorrect={false}
//                         value={Country}
//                         onChangeText={setCountry}
//                     />
//                 </View>

//                 {/* Date of Birth input */}
//                 <TouchableOpacity style={styles.inputContainer} onPress={showDatePicker}>
//                     <Icon name="calendar" size={20} color="#666" style={styles.inputIcon} />
//                     <Text style={styles.dateText}>
//                         {DateOfBirth ? DateOfBirth.toDateString() : "Date of Birth"}
//                     </Text>
//                 </TouchableOpacity>
//                 <DateTimePickerModal
//                     isVisible={isDatePickerVisible}
//                     mode="date"
//                     onConfirm={handleConfirmDate}
//                     onCancel={hideDatePicker}
//                 />

//                 <View style={styles.switchContainer}>
//                     <Text style={styles.switchLabel}>Has Car?</Text>
//                     <Switch value={HasCar} onValueChange={setHasCar} />
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <Icon name="phone" size={20} color="#666" style={styles.inputIcon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Phone Number"
//                         autoCapitalize="none"
//                         autoCorrect={false}
//                         value={PhoneNumber}
//                         onChangeText={setPhoneNumber}
//                     />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <Icon name="envelope" size={20} color="#666" style={styles.inputIcon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Email"
//                         keyboardType="email-address"
//                         autoCapitalize="none"
//                         autoCorrect={false}
//                         value={Email}
//                         onChangeText={setEmail}
//                     />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Password"
//                         secureTextEntry
//                         autoCapitalize="none"
//                         autoCorrect={false}
//                         value={Password}
//                         onChangeText={setPassword}
//                     />
//                 </View>

//                 {/* Confirm Password Input */}
//                 <View style={styles.inputContainer}>
//                     <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Confirm Password"
//                         secureTextEntry
//                         autoCapitalize="none"
//                         autoCorrect={false}
//                         value={ConfirmPassword}
//                         onChangeText={setConfirmPassword}
//                     />
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <Icon name="language" size={20} color="#666" style={styles.inputIcon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Languages Spoken"
//                         autoCapitalize="none"
//                         autoCorrect={false}
//                         value={Languages}
//                         onChangeText={setLanguages}
//                     />
//                 </View>

//                 <TouchableOpacity style={styles.registerButton} onPress={btnRegister}>
//                     <Text style={styles.registerButtonText}>Register</Text>
//                 </TouchableOpacity>
//             </ScrollView>
//         </KeyboardAvoidingView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f2f2f2',
//     },
//     scrollContainer: {
//         flexGrow: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 20,
//         paddingBottom: 50,
//     },
//     logo: {
//         marginBottom: 30,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 6,
//         elevation: 10,
//         borderRadius: 20,
//         overflow: 'hidden',
//     },
//     title: {
//         fontSize: 30,
//         fontWeight: 'bold',
//         color: '#333',
//         marginBottom: 25,
//         textAlign: 'center',
//         letterSpacing: 1.2,
//         textShadowColor: 'rgba(0, 0, 0, 0.1)',
//         textShadowOffset: { width: 2, height: 2 },
//         textShadowRadius: 4,
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         width: '95%',
//         backgroundColor: '#fff',
//         paddingHorizontal: 15,
//         paddingVertical: 8,
//         marginVertical: 8,
//         borderRadius: 10,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 3,
//     },
//     inputIcon: {
//         marginRight: 10,
//         color: '#3498db',
//     },
//     input: {
//         flex: 1,
//         height: 40,
//         fontSize: 16,
//         color: '#333',
//         paddingHorizontal: 10,
//     },
//     dateText: {
//         flex: 1,
//         height: 40,
//         textAlignVertical: 'center',
//         color: '#666',
//         fontSize: 16,
//     },
//     switchContainer: {
//         flexDirection: 'row', // Arrange items horizontally
//         alignItems: 'center', // Align items vertically centered
//         justifyContent: 'flex-start', // Align items to the left
//         width: '95%',
//         marginVertical: 10,
//         paddingHorizontal: 15,
//         backgroundColor: '#fff',
//         borderRadius: 12,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 3,
//         paddingVertical: 8,
//     },
//     switchLabel: {
//         fontSize: 16,
//         color: '#333',
//         marginRight: 10, // Add space between the label and the switch
//     },
//     switch: {
//         transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
//         color: '#2ecc71',
//     },
//     registerButton: {
//         width: '60%',
//         height: 40,
//         backgroundColor: '#e74c3c',
//         borderRadius: 25,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginVertical: 15,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.25,
//         shadowRadius: 10,
//         elevation: 10,
//     },
//     registerButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//         letterSpacing: 1,
//         textTransform: 'uppercase',
//     },
// });


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Switch, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GuidesLogo from '../assets/guides-logo.svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

const apiUrl = 'http://guides.somee.com/api/GuidesRW';

export default function GuideSignUp() {
    const navigation = useNavigation();
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Bio, setBio] = useState('');
    const [Country, setCountry] = useState(null);
    const [HasCar, setHasCar] = useState(false);
    const [AverageRating, setAverageRating] = useState(0);  // Optional field
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');  // New Confirm Password Field
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Email, setEmail] = useState('');
    const [Languages, setLanguages] = useState('');
    const [DateOfBirth, setDateOfBirth] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [countries, setCountries] = useState([]);
    const [open, setOpen] = useState(false);

    // Fetch countries when component mounts
    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const countriesData = response.data.map(country => ({
                label: country.name.common,
                value: country.name.common,
            }));
            setCountries(countriesData);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    // Date picker controls
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleConfirmDate = (date) => {
        setDateOfBirth(date);
        hideDatePicker();
    };

    // Function to validate and submit the form
    const btnRegister = () => {
        if (Password !== ConfirmPassword) {
            Alert.alert("Password Mismatch", "Passwords do not match.");
            return;
        }

        const guideData = {
            FirstName,
            LastName,
            Bio,
            Country,
            HasCar,
            AverageRating: AverageRating || null,
            Password,
            PhoneNumber,
            Email,
            DateOfBirth: DateOfBirth ? DateOfBirth.toISOString().split('T')[0] : null,
            Languages,
        };

        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(guideData),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8',
            }
        })
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    return res.json();
                } else if (res.status === 400) {
                    throw new Error('Registration details not correct');
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(result => {
                navigation.navigate('HomePageGuide');
            })
            .catch(error => {
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
                <Text style={styles.title}>Guide Register</Text>

                {/* First Name Input */}
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

                {/* Last Name Input */}
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

                {/* Bio Input */}
                <View style={styles.inputContainer}>
                    <Icon name="info-circle" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Bio"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={Bio}
                        onChangeText={setBio}
                    />
                </View>

                {/* Country Dropdown Picker */}
                <DropDownPicker
                    open={open}
                    value={Country}
                    items={countries}
                    setOpen={setOpen}
                    setValue={setCountry}
                    setItems={setCountries}
                    placeholder="Select Country"
                    searchable={true}
                    searchPlaceholder="Type a country name..."
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainerStyle}
                    listMode="MODAL"
                />

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

                {/* Has Car Switch */}
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Has Car?</Text>
                    <Switch value={HasCar} onValueChange={setHasCar} />
                </View>

                {/* Phone Number Input */}
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

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={Email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Password Input */}
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

                {/* Confirm Password Input */}
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={ConfirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>

                {/* Languages Input */}
                <View style={styles.inputContainer}>
                    <Icon name="language" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Languages Spoken"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={Languages}
                        onChangeText={setLanguages}
                    />
                </View>

                {/* Register Button */}
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
        backgroundColor: '#f2f2f2',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingBottom: 50,
    },
    logo: {
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 10,
        borderRadius: 20,
        overflow: 'hidden',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 25,
        textAlign: 'center',
        letterSpacing: 1.2,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '95%',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginVertical: 8,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    inputIcon: {
        marginRight: 10,
        color: '#3498db',
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
        paddingHorizontal: 10,
    },
    dateText: {
        flex: 1,
        height: 40,
        textAlignVertical: 'center',
        color: '#666',
        fontSize: 16,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '95%',
        marginVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderColor: '#ccc',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        paddingVertical: 8,
    },
    switchLabel: {
        fontSize: 16,
        color: '#333',
        marginRight: 10,
    },
    dropdownContainer: {
        width: '95%',
        marginBottom: 10,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
    },
    dropdownContainerStyle: {
        borderColor: '#ccc',
    },
    registerButton: {
        width: '60%',
        height: 40,
        backgroundColor: '#e74c3c',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
});
