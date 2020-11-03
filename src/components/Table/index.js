import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import ModalExcluir from '../Modal'

const TableCustom = ({ data }) => {
  return (
    <>
      <Typography>Clientes</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>CPF/CNPJ</TableCell>
            <TableCell>Nome do Cliente</TableCell>
            <TableCell>Classificação</TableCell>
            <TableCell>Telefones</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.ClienteId}>
              <TableCell>
                {row.TipoPessoa === 'PF' ? row.Cpf : row.Cnpj}
              </TableCell>
              <TableCell>{row.NomeCliente}</TableCell>
              <TableCell>{row.Classificacao}</TableCell>
              <TableCell>
                {row.TelefoneResidencial && row.TelefoneComercial
                  ? `${row.TelefoneResidencial} / ${row.TelefoneResidencial} `
                  : row.TelefoneResidencial}
              </TableCell>
              <TableCell>
                <Grid container spacing={2}>
                  <Grid item>
                    <Link to={`/edit/${row.ClienteId}`}>
                      <Edit color="primary" />
                    </Link>
                  </Grid>
                  <Grid item>
                    <ModalExcluir id={row.ClienteId} />
                  </Grid>
                </Grid>
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
