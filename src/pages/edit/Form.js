import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { cepMask, cnpjMask, cpfMask, phoneMask } from '../../utils'

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
  const { id } = useParams()

  const [cliente, setCliente] = useState({
    TipoPessoa: '',
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
    setCliente({ ...cliente, [event.target.name]: event.target.value })
  }

  const handleChangeCpf = (event) => {
    setCliente({ ...cliente, [event.target.name]: cpfMask(event.target.value) })
  }

  const handleChangeCnpj = (event) => {
    setCliente({
      ...cliente,
      [event.target.name]: cnpjMask(event.target.value),
    })
  }

  const handleChangeCep = (event) => {
    setCliente({ ...cliente, [event.target.name]: cepMask(event.target.value) })
  }

  const handleChangeTelefone = (event) => {
    setCliente({
      ...cliente,
      [event.target.name]: phoneMask(event.target.value),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await api.put(`/clientes/${id}`, cliente)
    if (res.status === 200) history.push('/')
  }

  useEffect(() => {
    async function getClientes() {
      try {
        const { data } = await api.get(`/clientes/${id}`)
        setCliente(data[0])
      } catch (error) {
        alert('Ocorreu um erro ao buscar os items')
      }
    }
    getClientes()
  }, [])

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
  } = cliente
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
                onChange={handleChangeCpf}
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
                onChange={handleChangeCnpj}
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
          {TipoPessoa === 'PJ' && (
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
          )}
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
            <FormControl fullWidth>
              <InputLabel id="classificacao-label">Classificação</InputLabel>
              <Select
                required
                labelId="classificacao-label"
                id="classificacao"
                name="Classificacao"
                value={Classificacao}
                onChange={handleChange}
              >
                <MenuItem value="Ativo">Ativo</MenuItem>
                <MenuItem value="Inativo">Inativo</MenuItem>
                <MenuItem value="Preferencial">Preferencial</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="telefoneResidencial"
              name="TelefoneResidencial"
              label="Telefone residencial"
              fullWidth
              value={TelefoneResidencial}
              onChange={handleChangeTelefone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="telefoneComercial"
              name="TelefoneComercial"
              label="Telefone comercial"
              fullWidth
              value={TelefoneComercial}
              onChange={handleChangeTelefone}
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
