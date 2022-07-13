import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
// import Table from 'react-bootstrap/Button';

class TableNTC extends React.Component { 
  
  render() {

    const HeadTable = ['ID Tipo Jornada', 'Data Inicio', 'Data Fim', 'Duração', 'ID Jornada'];
 
    return (
      <Table>
        <View style={styles.titleTableDiv}>
          <Text style={styles.titleTable}>
            Tabela de Registros
          </Text>
        </View>
        <Row
          data={HeadTable}
          style={styles.RowStyle}
          borderStyle={{ borderWidth:  1 }}
          textStyle={styles.text}
        />
        <TableWrapper borderStyle={{ borderWidth: 1 }}>
          <Rows
            // data={this.props.DataTable === null ? this.props.DataTable : this.props.storeTable}
            data={this.props.dataTable2}
            style={styles.RowsStyle}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
    )
  }
}

const styles = StyleSheet.create({
  RowStyle: {
    textAlign: 'center',
    backgroundColor: '#ff6347',
    borderWidth:  1,
  },
  RowsStyle: {
    height: 60,
    backgroundColor: '#e9967a',
    borderWidth:  1,
    borderStyle:  'solid',
    borderColor: '#000000',
  },
  titleTable: {
    padding: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#dc143c',
    textAlign: 'center',
  },
  titleTableDiv: {
    backgroundColor: '#000080',
  },
  text: { textAlign: 'center' },
});

export default TableNTC