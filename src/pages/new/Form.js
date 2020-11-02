import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import api from '../../services/api'
import { useHistory } from 'react-router-dom'
import { cepMask } from '../../utils'

const useStyles = makeStyles((theme) => ({
  radio: {
    flexDirection: 'row',
  },
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
  const [state, setState] = React.useState({
    TipoPessoa: 'PF',
    Cpf: '',
    Cnpj: '',
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

  const handleChangeCep = (event) => {
    setState({ ...state, [event.target.name]: cepMask(event.target.value) })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await api.post('/clientes', state)
    if (res.status === 201) history.push('/')
  }

  const {
    TipoPessoa,
    Cpf,
    Cnpj,
    NomeCliente,
    RazaoSocial,
    Cep,
    Email,
    Classificacao,
    TelefoneResidencial,
    TelefoneComercial,
  } = state
  console.log(state)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Dados do cliente
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RadioGroup
              name="TipoPessoa"
              value={TipoPessoa}
              onChange={handleChange}
              className={classes.radio}
            >
              <Grid item xs={6}>
                <FormControlLabel
                  value="PF"
                  control={<Radio />}
                  label="Pessoa física"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="PJ"
                  control={<Radio />}
                  label="Pessoa jurídica"
                />
              </Grid>
            </RadioGroup>
          </Grid>
          {TipoPessoa === 'PF' ? (
            <Grid item xs={12}>
              <TextField
                required
                id="cpf"
                name="Cpf"
                label="CPF"
                fullWidth
                value={Cpf}
                onChange={handleChange}
              />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <TextField
                required
                id="cnpj"
                name="Cnpj"
                label="CNPJ"
                fullWidth
                value={Cnpj}
                onChange={handleChange}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              required
              id="nomeCliente"
              name="NomeCliente"
              label="Nome do cliente"
              fullWidth
              value={NomeCliente}
              onChange={handleChange}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="razaoSocial"
              name="RazaoSocial"
              label="Razão social"
              fullWidth
              value={RazaoSocial}
              onChange={handleChange}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="Email"
              type="email"
              label="E-mail"
              fullWidth
              value={Email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="cep"
              name="Cep"
              label="Cep"
              fullWidth
              value={Cep}
              onChange={handleChangeCep}
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
