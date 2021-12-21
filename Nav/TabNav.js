import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from "firebase";

import Create from '../Sceens/Create';
import Feed from '../Sceens/Feed';

const Tab = createMaterialBottomTabNavigator();

export default class TabNav extends React.Component {
    constructor() {
        super();
        this.state={
            light_theme: true
        }
    }
    fetchUser = () => {
        let theme;
        firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid)
        .on("value", (snapshot) => {
        theme = snapshot.val().current_theme
        this.setState({ light_theme: theme === "light" })
        })
        }
    render() {
        return(
            <Tab.Navigator
            labeled={false}
            barStyle={this.state.light_theme ? styles.bottomTabStyleL : styles.bottomTabStyle}
            screenOptions= {({route}) => ({
                tabBarIcon: ({focused, color, size}) =>{
                    let iconName;
                    if(route.name === 'Feed') {
                        iconName = focused
                        ? 'home'
                        : 'home-outline'
                    } else if(route.name === 'Create'){
                        iconName= focused? "add-circle":"add-circle-outline"
                    }
                    return(
                        <Ionicons name = {iconName} size={size} color={color}
                        style={styles.icons}/>
                    )
                }
            }) }
                
                activeColor='#f0f'
                inactiveColor = 'orange' >
                    <Tab.Screen name='Feed' component={Feed}/>
                    <Tab.Screen name='Create' component={Create}/>
            </Tab.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    bottomTabStyle:{
        backgroundColor:'#2f345d',
        height:'8%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        overflow:'hidden',
        position:'absolute'
    },
    bottomTabStyleL:{
        backgroundColor:'#afbdef',
        height:'8%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        overflow:'hidden',
        position:'absolute'
    },
    icons:{
        width:RFValue(30),
        height:RFValue(30),
    },
});