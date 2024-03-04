import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import React, { useState } from 'react';


function Input(props) {
  const {
    setState
  } = props
  return (
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={(_text) => setState(_text)}/>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>click</Text>
        </TouchableOpacity>
      </View>
  )
}

export default function App() {
  const [text, setText] = useState('')
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Input setState={setText}/>
        <View style={styles.content}>
          <Text style={styles.contentText}>筋肉 {text}</Text>
        </View>
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222',
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  button: {
    backgroundColor: 'rgb(29, 161, 242)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderColor: 'rgb(29, 161, 242)',
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  contentText: {
    color: 'white',
    fontSize: 22,
  }
});
