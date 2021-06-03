// src/screens/Home.js

import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'

function DetailActors(props) {
  const { route } = props
  const { navigation } = props
  const { item } = route.params
  let [actor, setActor] = React.useState('')
  useEffect(() => {
	fetch("http://localhost:3000/person/"+item, {"method": "GET", mode: 'cors'}).then(response => response.json()).then(response => {
        setActor(response)
      }).catch(err => {console.log(err);})
  }, [])
  console.log(actor);
  var movies_as_actor = "-";
  var movies_as_director = "-";
  var movies_as_producer = "-";
  if(actor['Movies As Actor Actress']){ movies_as_actor = actor['Movies As Actor Actress'].split(", ")}
  if(actor['Movies As Director']){ movies_as_director = actor['Movies As Director'].split(", ")}
  if(actor['Movies As Producer']){ movies_as_producer = actor['Movies As Producer'].split(", ")}
  console.log(movies_as_actor);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item}</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Movies As Actor Actress:</Text>
		<FlatList style={{padding:0,margin:0}} data={movies_as_actor} renderItem={({item}) => <TouchableOpacity style={{padding:0,margin:0}} onPress={() => navigation.navigate('Home')}><Text style={styles.cardText}>{item}</Text></TouchableOpacity>}/>
        <Text style={styles.cardText}>Movies As Director: {movies_as_director}</Text>
		<Text style={styles.cardText}>Movies As Producer: {movies_as_producer}</Text>
		<TouchableOpacity style={{padding:0,margin:0}} onPress={() => navigation.navigate('DetailActorsEdit', { item: actor})}><Text style={styles.cardText}>Edit</Text></TouchableOpacity>
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
  }
})

export default DetailActors