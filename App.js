import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  Button,
  SafeAreaView } from 'react-native';
import TableNTC from './Table'


export default function App() {

  const [travelStatus, setTravelStatus] = useState('selecione o status');
  const [DataTable, setDataTable] = useState([]);
  const [TravelId, setTravelId] = useState(1)

  function handleButton(status) {

    const initialDate = new Date().toLocaleTimeString();
    const endDate = new Date().toLocaleTimeString();

    const calcDif = (dti, dtf) => {
      console.log(dti, typeof dtf)
      return '10 min'
    }

    if (DataTable.length >= 1) {
      DataTable[(DataTable.length - 1)][2] = endDate
      const dti = DataTable[(DataTable.length - 1)][1]
      const dtf = DataTable[(DataTable.length - 1)][2]
      const dif = calcDif(dti, dtf)
      DataTable[(DataTable.length - 1)][3] = dif
    }

    if(status === 1) {
      setTravelStatus('1 - Direção')
      DataTable.push([1, initialDate, '---', '---', TravelId]);
      setDataTable([...DataTable])
      setTravelId(TravelId + 1)
    }
    if(status === 2) {
      setTravelStatus('2 - Refeição')
      DataTable.push([2, initialDate, '---', '---', TravelId]);
      setDataTable([...DataTable])
      setTravelId(TravelId + 1)
    }
    if(status === 3) {
      setTravelStatus('3 - Descanso')
      DataTable.push([3, initialDate, '---', '---', TravelId]);
      setDataTable([...DataTable])
      setTravelId(TravelId + 1)
    }

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
            keyExtractor={(item, index) => index}
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
              selected
            />
            <Button
              onPress={() => handleButton(2)}
              style={ styles.button }
              title="2 - Refeição"
              accessibilityLabel=""
            />
            <Button
              onPress={() => handleButton(3)}
              style={ styles.button }
              title="3 - Descanso"
              accessibilityLabel=""
            />
          </View>
          <TableNTC DataTable={DataTable} /> 
        </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#2A2A2A',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: '100%'
  },
  text: {
    alignSelf: 'center',
    color: '#f0ffff',
    marginBottom: 20,
    fontSize: 20,
  },
  list: {
    display: 'flex',
    paddingTop: 50,
    alignSelf: 'center',
  },
  title: {
    padding: 10,
    fontSize: 25,
    height: 60,
    color: '#f0ffff',
  },
  item: {
    fontSize: 20,
    height: 60,
    color: '#f0ffff',
    alignSelf: 'center'
  }, button: {
    margin: 10,
  }, HeadStyle: { 
    height: 50,
    alignContent: "center",
    backgroundColor: '#ffe0f0'
  }, TableText: { 
    margin: 10
  }
});
