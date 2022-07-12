import React from 'react';
import { StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';


class TableNTC extends React.Component { 
  
  render() {

    const HeadTable = ['ID Tipo Jornada', 'Data Inicio', 'Data Fim', 'Duração', 'ID Jornada']
 
    return (
      <Table>
        <Row data={HeadTable} style={styles.HeadStyle} />
        <Rows data={this.props.DataTable} style={styles.HeadStyle} />
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

export default TableNTC