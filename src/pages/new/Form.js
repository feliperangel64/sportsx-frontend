import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import api from '../../services/api'

export default function Form() {
  const [state, setState] = React.useState({
    TipoPessoa: '',
    NomeCliente: '',
    RazaoSocial: '',
    Cep: '',
    Email: '',
    Classificacao: '',
    TelefoneResidencial: '',
    TelefoneComercial: '',
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleSubmit = async () => {
    await api.post('/clientes', state)
  }
  const {
    TipoPessoa,
    NomeCliente,
    RazaoSocial,
    Cep,
    Email,
    Classificacao,
    TelefoneResidencial,
    TelefoneComercial,
  } = state
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Dados do cliente
      </Typography>
      <form onSubmit={handleSubmit}>
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
          <Button variant="contained" color="primary" type="submit">
            save
          </Button>
        </Grid>
      </form>
    </React.Fragment>
  )
}
