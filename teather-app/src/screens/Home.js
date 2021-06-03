// src/screens/Home.js

import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'

function Home(props) {
  const { navigation } = props
  let [movie, setMovie] = React.useState('')
  useEffect(() => {
	fetch("http://localhost:3000/movie", {"method": "GET", mode: 'cors'}).then(response => response.json()).then(response => {
        setMovie(response)
      }).catch(err => {console.log(err);})
  }, [])
  return (
    <View style={styles.container}>
	  <FlatList data={movie} renderItem={({item}) => 
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Detail', { item: item})}><Text style={styles.buttonText}>{item.Title}</Text></TouchableOpacity>}/>
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
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
})

export default Home