import React from 'react';
import { StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
// import Table from 'react-bootstrap/Button';

class TableNTC extends React.Component { 
  
  render() {

    const HeadTable = ['ID Tipo Jornada', 'Data Inicio', 'Data Fim', 'Duração', 'ID Jornada']
 
    return (
      <Table style={styles.Table}>
        <Row data={HeadTable} style={styles.RowStyle} />
        <Rows
        // data={this.props.DataTable === null ? this.props.DataTable : this.props.storeTable}
        data={this.props.DataTable}
        style={styles.RowsStyle}
        />
      </Table>
    )
  }
}

const styles = StyleSheet.create({
  RowStyle: {
    height: 80,
    textAlign: "center",
    alignItems: "center",
    fontFamily: "Helvética",
    backgroundColor: '#ff6347'
  },
  RowsStyle: {
    height: 50,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: '#e9967a'
  }
});

export default TableNTC