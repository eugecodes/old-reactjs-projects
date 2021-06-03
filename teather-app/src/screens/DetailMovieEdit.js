// src/screens/Home.js

import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'

function arabicToRoman(number){
	let roman = "";
	const romanNumList = {M:1000,CM:900, D:500,CD:400, C:100, XC:90,L:50, XV: 40, X:10, IX:9, V:5, IV:4, I:1};
	let a;
	if(number < 1 || number > 3999)
	  return "Enter a number between 1 and 3999";
	else{
	  for(let key in romanNumList){
		  a = Math.floor(number / romanNumList[key]);
		  if(a >= 0){
			  for(let i = 0; i < a; i++){
				roman += key;
			  }
			}
		  number = number % romanNumList[key];
	  }
	}
	return roman;
}

function Detail(props) {
  const { route } = props
  const { navigation } = props
  const { item } = route.params
  let [movie, setMovie] = React.useState('')
  var casting = []; var directors = [];
  if(!item['Title']) {
	console.log("entre aca " + item);
	fetch("http://localhost:3000/movie/"+item, {"method": "GET", mode: 'cors'}).then(response => response.json()).then(response => {
		movie = response;
	}).catch(err => {console.log(err);})
  } else {
	  movie = item;
	  console.log("nooo entre aca!");
  }
  console.log(movie);
  if(movie){
	casting = movie.Casting.split(", ")
	directors = movie.Directors.split(", ")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Release Year ' + arabicToRoman(item['Release Year'])}</Text>
      <View style={styles.card}>
        <Text style={styles.cardText2}>Producers: {item.Producers}</Text>
        <Text style={styles.cardText}>Casting:</Text>
		<FlatList style={{padding:0,margin:0}} data={casting} renderItem={({item}) => <TouchableOpacity style={{padding:0,margin:0}} onPress={() => navigation.navigate('DetailActors', { item: item})}><Text style={styles.cardText}>{item}</Text></TouchableOpacity>}/>
		<Text style={styles.cardText}>Directors:</Text>
		<FlatList data={directors} renderItem={({item}) => <TouchableOpacity><Text style={styles.cardText}>{item}</Text></TouchableOpacity>}/>
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
  cardText2: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 15
  }
})

export default Detail