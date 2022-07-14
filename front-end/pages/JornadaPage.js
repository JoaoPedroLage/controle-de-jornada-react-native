import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView } from 'react-native';
import TableNTC from '../components/Table'
import Modal from "react-native-modal";

export default function Jornada() {

  const [travelStatus, setTravelStatus] = useState('selecione o status');
  const [dataTable, setDataTable] = useState([]);
  const [dataShowTable, setDataShowTable] = useState([]);
  // const [dataJornada, setDataJornada] = useState([]);
  // const [dates, setDatesJornada] = useState([]);
  const [travelId, setTravelId] = useState(1);
  const [status, setStatus] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const statusName = ['Direção', 'Refeição', 'Descanso'];
  const dates = [];
  const datesToCalDif = [];

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const formatDate = (date) => {
    const dateToString = new Date().toLocaleString();
    const dateBr = date.toLocaleDateString();
    const dateBrSlipt = dateBr.split('/');
    const dateBrFormat = [dateBrSlipt[1], dateBrSlipt[0], dateBrSlipt[2]].join('/');
    const dateAndTimeBr = `${dateBrFormat} \n ${date.toLocaleTimeString()}`;

    return [dateToString, dateAndTimeBr, dateBrFormat];
  }

  const saveInJornadaTable = () => {
    const date = new Date();
    const onlyDate = date.toLocaleDateString();
    const dateBR = formatDate(date)[2];
    
    if(dataTable.length === 1) dates.push(dateBR); datesToCalDif.push(onlyDate);
    console.log(datesToCalDif);

    if(dataTable.length >= 1) {
      const dif = calcDif(datesToCalDif[dates.length - 1], onlyDate, 1);
      if (dif > 86400) dates.push(dateBR); datesToCalDif.push(onlyDate);
      console.log(dif)
    }

    // if(date.getTime())
    // setDatesJornada()

  }

  const calcDif = (dti, dtf, date) => {
    const difTime = new Date(dti).getTime() - new Date(dtf).getTime();
    const difSeg = ((Math.ceil(((difTime * -1) / 1000))));

    if(date === 1 ) return difSeg;

    if(Number(difSeg) >= 600) {
      return (difSeg / 60).toFixed(2) + ' horas';
    }
    else if(Number(difSeg) >= 60) {
      return (difSeg / 60).toFixed(2) + ' minutos';
    } else {
      return Math.ceil(difSeg) + ' segundos';
    }
  }

  function handleButton(status) {
    const date = new Date();
    const dateBR = formatDate(date);

    setIsModalVisible(!isModalVisible);
    setStatus(status);

    if (dataTable.length >= 1) {
      dataShowTable[(dataTable.length - 1)][2] = dateBR[1];
      dataTable[(dataTable.length - 1)][2] = dateBR[0];
      const dti = dataTable[(dataTable.length - 1)][1];
      const dtf = dataTable[(dataTable.length - 1)][2];
      const dif = calcDif(dti, dtf);
      dataShowTable[(dataTable.length - 1)][3] = dif;
      saveInJornadaTable();
    }

    setTravelStatus(`${status + 1} - ${statusName[status]}`)
    dataTable.push([status + 1, dateBR[0], '---', '---', travelId]);
    dataShowTable.push([status + 1, dateBR[1], '---', '---', travelId]);
    setDataTable([...dataTable]);
    setDataShowTable([...dataShowTable]);
    setTravelId(travelId + 1);
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
          <TableNTC dataShowTable={dataShowTable} />
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
