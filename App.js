import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  Button,
  SafeAreaView,
  ScrollView } from 'react-native';
import TableNTC from './Table'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [travelStatus, setTravelStatus] = useState('selecione o status');
  const [storeTable, setStoreTable] = useState([]);
  const [DataTable, setDataTable] = useState(storeTable === null ?  [] : storeTable);
  const [TravelId, setTravelId] = useState(1);

  useEffect( async () => {
    await getData();
  }, [storeTable]);

  const storeData = async (value) => {
    await AsyncStorage.setItem('@storage_Key', JSON.stringify(value));
  }

  const getData = async () => {
      const value = await AsyncStorage.getItem('@storage_Key');
      if(JSON.parse(value) !== null) {
        return null;
      } else setStoreTable(JSON.parse(value));
  }

  const calcDif = (dti, dtf) => {
    const difTime = new Date(dti).getTime() - new Date(dtf).getTime();
    const difSeg = ((Math.ceil(((difTime * -1) / 1000))));

    if(Number(difSeg) >= 60) {
      return (difSeg / 60).toFixed(2) + ' minutos';
    } else {
      return Math.ceil(difSeg) + ' segundos';
    }
  }

  function handleButton(status) {
    const initialDate = new Date();
    const endDate = new Date();
    const statusName = ['Direção', 'Refeição', 'Descanso']

    if (DataTable.length >= 1) {
      DataTable[(DataTable.length - 1)][2] = endDate.toLocaleString()
      const dti = DataTable[(DataTable.length - 1)][1]
      const dtf = DataTable[(DataTable.length - 1)][2]
      const dif = calcDif(dti, dtf)
      DataTable[(DataTable.length - 1)][3] = dif
    }

    setTravelStatus(`${status} - ${statusName[status-1]}`)
    DataTable.push([status, initialDate.toLocaleString(), '---', '---', TravelId]);
    setDataTable([...DataTable]);
    setTravelId(TravelId + 1);
    storeData([...DataTable]);
  };

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <SectionList
            style={styles.list}
            sections={[
            { title: 'Status da viagem atual:', data: [travelStatus] }
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
            renderSectionHeader={({section}) => <Text style={styles.title}>{section.title}</Text>}
            keyExtractor={(_, index) => index}
          />
          <View style={styles.button}>
            <Text 
              style={styles.text}
              >Novo Status:
            </Text>
            <Button
              onPress={() => handleButton(1)}
              style={ styles.button }
              title="1 - Direção"
              accessibilityLabel=""
              disabled = { travelStatus === '1 - Direção' ? true : false }
            />
            <Button
              onPress={() => handleButton(2)}
              style={ styles.button }
              title="2 - Refeição"
              accessibilityLabel=""
              disabled = { travelStatus === '2 - Refeição' ? true : false }
            />
            <Button
              onPress={() => handleButton(3)}
              style={ styles.button }
              title="3 - Descanso"
              accessibilityLabel=""
              disabled = { travelStatus === '3 - Descanso' ? true : false }
            />
          </View>
          {/* <ScrollView> */}
            <TableNTC DataTable={DataTable} storeTable={storeTable} />
          {/* </ScrollView> */}
        </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#2A2A2A',
    alignItems: 'stretch',
    height: '100%'
  },
  text: {
    alignSelf: 'center',
    color: '#f0ffff',
    fontSize: 30,
    marginBottom: 10,
    fontSize: 20,
  },
  list: {
    display: 'flex',
    paddingTop: 50,
    fontSize: 50,
    alignSelf: 'center',
  },
  title: {
    padding: 10,
    fontSize: 25,
    height: 60,
    color: '#f0ffff',
  },
  item: {
    fontSize: 30,
    height: 60,
    color: '#f0ffff',
    alignSelf: 'center'
  }, button: {
    fontSize: 30,
    margin: 10,
  }, HeadStyle: { 
    height: 50,
    alignContent: "center",
    backgroundColor: '#ffe0f0'
  }, TableText: { 
    margin: 10
  }
});
