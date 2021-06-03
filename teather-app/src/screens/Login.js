// src/screens/Home.js

import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'

function LoginSend(item){
	var b = 'username='+item['username']+'&password='+item['password'];
	console.log(b);
	fetch("http://localhost:3000/login", {"method": "POST", headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"}, body: b, mode: 'cors'}).then(response => {
        console.log(response);
    }).catch(err => {console.log(err);})
}

function Login(props) {
  const { navigation } = props
  var item = {};
  return (
  <View style={styles.container}>
    <View style={styles.card}>
		<TextInput style={styles.cardText} placeholder="Username" placeholderTextColor="#ccc" onChangeText={text => item['username'] = text}/>
        <TextInput style={styles.cardText} placeholder="Password" placeholderTextColor="#ccc" onChangeText={text => item['password'] = text}/>
		<TouchableOpacity style={styles.buttonContainer} onPress={() => LoginSend(item)}><Text styles={styles.buttonText}>Login</Text></TouchableOpacity>
	</View>
	</View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20,
	color: '#ffd700',
	fontSize: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#ffd700'
  },
  card: {
    width: 350,
    height: 400,
    borderRadius: 10,
    backgroundColor: '#101010',
    margin: 10,
    padding: 10,
    alignItems: 'left'
  },
  cardText: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 5,
	padding: 20
  },
  cardText2: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 15
  }
})

export default Login