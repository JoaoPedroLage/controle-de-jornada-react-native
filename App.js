import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView } from 'react-native';
import TableNTC from './components/Table'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";

export default function App() {

  const [travelStatus, setTravelStatus] = useState('selecione o status');
  const [storeTable, setStoreTable] = useState(storeTable === null ?  [] : storeTable);
  const [dataTable, setDataTable] = useState([]);
  const [dataTable2, setDataTable2] = useState([]);
  const [travelId, setTravelId] = useState(1);
  const [status, setStatus] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const statusName = ['Direção', 'Refeição', 'Descanso']

  // useEffect( async () => {
  //  await getData();
  // }, [DataTable]);

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

    if(Number(difSeg) >= 600) {
      return (difSeg / 60).toFixed(2) + ' horas';
    }
    else if(Number(difSeg) >= 60) {
      return (difSeg / 60).toFixed(2) + ' minutos';
    } else {
      return Math.ceil(difSeg) + ' segundos';
    }
  }

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  function handleButton(status) {
    const date = new Date().toLocaleString();
    const date2 = new Date();
    const inSlicedDate = date2.toLocaleDateString().split('/');
    const BRformat = `${[inSlicedDate[1], inSlicedDate[0], inSlicedDate[2]].join('/')} \n ${date2.toLocaleTimeString()}`;

    setIsModalVisible(!isModalVisible);
    setStatus(status);

    if (dataTable.length >= 1) {
      dataTable2[(dataTable.length - 1)][2] = BRformat;
      dataTable[(dataTable.length - 1)][2] = date;
      const dti = dataTable[(dataTable.length - 1)][1];
      console.log(dti)
      const dtf = dataTable[(dataTable.length - 1)][2];
      console.log(dtf)
      const dif = calcDif(dti, dtf);
      dataTable2[(dataTable.length - 1)][3] = dif;
    }

    setTravelStatus(`${status + 1} - ${statusName[status]}`)
    dataTable.push([status + 1, date, '---', '---', travelId]);
    dataTable2.push([status + 1, BRformat, '---', '---', travelId]);
    setDataTable([...dataTable]);
    setDataTable2([...dataTable2]);
    setTravelId(travelId + 1);
    storeData([...dataTable]);
  };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Modal isVisible={isModalVisible}>
            <View style={{ display: 'flex', alignContent: 'center', paddingBottom: 10}}>
              <Text style={styles.modalText}>
                Você acabou de atulizar o Status da sua Jornada para&nbsp;
                <Text style={{fontWeight: "bold"}}>{statusName[status]}!</Text>
                {'\n'}
                Para adicionar um novo status basta clicar em uma das 3 opções.
              </Text>
              <Button title="Fechar Pop-up" onPress={handleModal} />
            </View>
          </Modal>
          <Text style={styles.titleStatus}>           
            Status da viagem atual:
          </Text>
          <Text style={styles.status}>           
            {travelStatus}
          </Text>
          <View style={styles.button}>
            <Text style={styles.text}>
              Novo Status:
            </Text>
            <Button
              onPress={() => handleButton(0)}
              style={ styles.button }
              title="1 - Direção"
              accessibilityLabel=""
              disabled = { travelStatus === '1 - Direção' ? true : false }
            />
            <Button
              onPress={() => handleButton(1)}
              style={ styles.button }
              title="2 - Refeição"
              accessibilityLabel=""
              disabled = { travelStatus === '2 - Refeição' ? true : false }
              />
            <Button
              onPress={() => handleButton(2)}
              style={ styles.button }
              title="3 - Descanso"
              accessibilityLabel=""
              disabled = { travelStatus === '3 - Descanso' ? true : false }
              />
          </View>
          <TableNTC dataTable2={dataTable2} storeTable={storeTable} />
        </ScrollView>
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
  },
  titleStatus: {
    paddingTop: 60,
    fontSize: 25,
    alignSelf: 'center',
    color: '#f0ffff',
  },
  status: {
    padding: 20,
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff8dc',
    textAlign: 'center',
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
  }, TableTextDiv: { 
    borderRadius: 1,
  }, modalText: {
    padding: 10,
    margin: 10,
    fontSize: 20,
    color: '#000000',
    backgroundColor: '#0000ff',
  }
});
