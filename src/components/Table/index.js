import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'

const TableCustom = ({ data }) => {
  console.log(data)
  return (
    <>
      <Typography>Recent Orders</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>CPF/CNPJ</TableCell>
            <TableCell>Nome do Cliente</TableCell>
            <TableCell>Classificação</TableCell>
            <TableCell>Telefone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.ClienteId}>
              <TableCell>{row.TipoPessoa}</TableCell>
              <TableCell>{row.NomeCliente}</TableCell>
              <TableCell>{row.Classificacao}</TableCell>
              <TableCell>{row.TelefoneResidencial}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

TableCustom.propTypes = {
  data: PropTypes.any,
}

export default TableCustom
