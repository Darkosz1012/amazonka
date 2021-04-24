import React from 'react';
// import TableHeader from './TableHeader';
// import TableBody from './TableBody';
import './table.css';

const Table = (props) => {
  const { headers, rows } = props;
  return (
      <table className="table table-bordered table-hover">
      <TableHeader headers={headers}></TableHeader>
      <TableBody headers={headers} rows={rows}></TableBody>
      </table>
  );
}

export default Table;