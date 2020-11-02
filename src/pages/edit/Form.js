import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

export default function Form() {
  const classes = useStyles()
  const history = useHistory()
  const [cliente, setCliente] = useState({
    TipoPessoa: '',
    NomeCliente: '',
    RazaoSocial: '',
    Cep: '',
    Email: '',
    Classificacao: '',
    TelefoneResidencial: '',
    TelefoneComercial: '',
  })
  /*   const [state, setState] = React.useState() */

  const handleChange = (event) => {
    setCliente({ ...cliente, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await api.put('/clientes/2', cliente)
    if (res.status === 201) history.push('/')
  }

  useEffect(() => {
    async function getClientes() {
      try {
        const { data } = await api.get('/clientes/2')
        setCliente(data[0])
      } catch (error) {
        alert('Ocorreu um erro ao buscar os items')
      }
    }
    getClientes()
  }, [])
  console.log(cliente)
  const {
    TipoPessoa,
    NomeCliente,
    RazaoSocial,
    Cep,
    Email,
    Classificacao,
    TelefoneResidencial,
    TelefoneComercial,
  } = cliente
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Dados do cliente
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="tipoPessoa"
              name="TipoPessoa"
              label="Tipo pessoa"
              fullWidth
              value={TipoPessoa}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="nomeCliente"
              name="NomeCliente"
              label="Nome do cliente"
              fullWidth
              value={NomeCliente}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="razaoSocial"
              name="RazaoSocial"
              label="Razão social"
              fullWidth
              value={RazaoSocial}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              name="Email"
              label="E-mail"
              fullWidth
              value={Email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="cep"
              name="Cep"
              label="Cep"
              fullWidth
              value={Cep}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="classificacao"
              name="Classificacao"
              label="Classificação"
              fullWidth
              value={Classificacao}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="telefoneResidencial"
              name="TelefoneResidencial"
              label="Telefone residencial"
              fullWidth
              value={TelefoneResidencial}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="telefoneComercial"
              name="TelefoneComercial"
              label="Telefone comercial"
              fullWidth
              value={TelefoneComercial}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Salvar
          </Button>
        </div>
      </form>
    </React.Fragment>
  )
}
