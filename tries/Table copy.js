import React from 'react';
import {StyleSheet} from 'react-native';
import { Table, Row, Rows, Cell } from 'react-native-table-component';


class Table2 extends React.Component { 
  
  render() {

    const HeadTable = ['ID Tipo Jornada', 'Data Inicio', 'Data Fim', 'Duração', 'ID Jornada']
 
    const renderRows = this.props.DataTable.map(row => {
      return (
        <Row key={row[0]} style={styles.HeadStyle}>
          <Cell>{row[0]}</Cell>
          <Cell>{row[1].toLocaleTimeString()}</Cell>
        </Row>
      )
    })

    return (
      <Table>
        <Row data={HeadTable} style={styles.HeadStyle} />
        {renderRows}
      </Table>
    )
 
  }

}

const styles = StyleSheet.create({
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: '#ffe0f0'
  }
});

export default Table2