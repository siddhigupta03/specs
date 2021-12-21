import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackNav from '../Nav/Stack'
import Profile from '../Sceens/Profile'
import LogOut from '../Sceens/Logout'

const Drawer = createDrawerNavigator()

const drawerNav = () => {
return <Drawer.Navigator>
        <Drawer.Screen name='Home' component={StackNav}/>
        <Drawer.Screen name='Profile' component={Profile}/>
        <Drawer.Screen name='Logout' component={LogOut}/>
    </Drawer.Navigator>
}

export default drawerNav;