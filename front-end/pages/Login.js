import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleButton() {
    if(email === 'fulano@gmail.com' && password === 'fulano123'){

    }
  }
 
  return (
    <SafeAreaView style={styles.containerTotal}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Insira o seu Email"
            placeholderTextColor="#003f5c"
            onChangeText={({ target }) => setEmail(target.value)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Insira a sua Senha"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={({ target }) => setPassword(target.value)}
          />
        </View>
        <TouchableOpacity>
          <Button 
            color="#FF1493"
            title="LOGIN"
            onPress={handleButton()}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  containerTotal: {
    display: 'flex',
    backgroundColor: '#2A2A2A',
    alignItems: 'stretch',
    height: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
<div class="open_grepper_editor" title="Edit & Save To Grepper"></div>