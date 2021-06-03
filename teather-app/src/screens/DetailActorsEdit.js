// src/screens/Home.js

import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'

function modifyActor(item, result_save){
	console.log(item);
	var actor_data = 'lastName='+item['Last Name']+'&firstName='+item['First Name']+"aliases=''&moviesAsActor="+item['Movies As Actor Actress']+'&moviesAsDirector='+item['Movies As Director']+'&moviesAsProducer='+item['Movies As Producer'];
	fetch("http://localhost:3000/person/edit", {"method": "POST", headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"}, body: actor_data, mode: 'cors'}).then(response => {
        console.log(response);
		result_save = response;
    }).catch(err => {console.log(err);})
}

function DetailActorsEdit(props) {
  const { route } = props
  const { navigation } = props
  const { item } = route.params
  var result_save = '';
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Movies As Actor Actress:</Text>
		<TextInput style={styles.cardText} placeholder="Enter the movies separated by ," placeholderTextColor="#ccc" onChangeText={text => item['Movies As Actor Actress'] = text}/>
        <Text style={styles.cardText}>Movies As Director:</Text>
		<TextInput style={styles.cardText} placeholder="Enter the movies separated by ," placeholderTextColor="#ccc" onChangeText={text => item['Movies As Director'] = text}/>
		<Text style={styles.cardText}>Movies As Producer:</Text>
		<TextInput style={styles.cardText} placeholder="Enter the movies separated by ," placeholderTextColor="#ccc" onChangeText={text => item['Movies As Producer'] = text}/>
		<TouchableOpacity style={{padding:0,margin:0}} onPress={() => modifyActor(item, result_save)}><Text style={styles.cardText}>Save</Text></TouchableOpacity>
		
		<Text style={styles.cardText}>{result_save}</Text>
		
		<View style={styles.login}>
			<TouchableOpacity style={{padding:0,margin:0}} onPress={() => navigation.navigate('Login')}><Text style={styles.cardText}>Must Login First to Save</Text></TouchableOpacity>
		</View>
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
    marginBottom: 5
  },
  login: {
	  marginTop: 10,
	  borderRadius: 20,
	  borderColor: '#ffd700'
  }
})

export default DetailActorsEdit