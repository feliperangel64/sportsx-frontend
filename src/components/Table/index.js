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
import { Link } from 'react-router-dom'

const TableCustom = ({ data }) => {
  console.log(data)
  return (
    <>
      <Typography>Clientes</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>CPF/CNPJ</TableCell>
            <TableCell>Nome do Cliente</TableCell>
            <TableCell>Classificação</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.ClienteId}>
              <TableCell>{row.TipoPessoa}</TableCell>
              <TableCell>{row.NomeCliente}</TableCell>
              <TableCell>{row.Classificacao}</TableCell>
              <TableCell>{row.TelefoneResidencial}</TableCell>
              <TableCell>
                <Link to="/edit/2">Editar</Link>
              </TableCell>
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
