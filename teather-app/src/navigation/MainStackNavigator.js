import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import Detail from '../screens/Detail'
import DetailActors from '../screens/DetailActors'
import DetailActorsEdit from '../screens/DetailActorsEdit'
import Login from '../screens/Login'

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{gestureEnabled: true, headerStyle: {backgroundColor: '#101010'},headerTitleStyle: {fontWeight: 'bold'},headerTintColor: '#ffd700'}}>
        <Stack.Screen name='Home' component={Home} options={{ title: 'Home Screen - Movies' }} />
		<Stack.Screen name='Detail' component={Detail} options={({ route }) => ({title: route.params.item.Title})}/>
		<Stack.Screen name='DetailActors' component={DetailActors} options={({ route }) => ({title: route.params.item})}/>
		<Stack.Screen name='Login' component={Login} options={{ title: 'Login' }}/>
		<Stack.Screen name='DetailActorsEdit' component={DetailActorsEdit} options={({ route }) => ({title: route.params.item['First Name'] + ' ' + route.params.item['Last Name']})}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator