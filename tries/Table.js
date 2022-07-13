import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
// import Table from 'react-bootstrap/Button';

class TableNTC extends React.Component { 
  
  render() {

    const HeadTable = ['ID Tipo Jornada', 'Data Inicio', 'Data Fim', 'Duração', 'ID Jornada']
 
    return (
      <Table style={{borderWidth:  1, borderColor: '#000000'}}>
        {/* <View>
          <Text style={styles.titleTable}>
            Tabela de registros
          </Text>
        </View> */}
        <Row 
          data={HeadTable}
          style={styles.RowStyle}
          textStyle={styles.text}
        />
        <TableWrapper style={{borderWidth:  1, borderColor: '#000000',}}>
          <Rows
            // data={this.props.DataTable === null ? this.props.DataTable : this.props.storeTable}
            data={this.props.DataTable}
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
    height: 55,
    textAlign: 'center',
    alignItems: 'center',
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
    paddingTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#dc143c',
    textAlign: 'center',
  },
  text: { textAlign: 'center' },
});

export default TableNTC