import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper, Button } from '@material-ui/core'
import api from '../../services/api'
import Table from '../../components/Table'
import { useHistory } from 'react-router'
import Close from '@material-ui/icons/Close'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'

const Main = () => {
  const classes = useStyles()
  const [clientes, setClientes] = useState([])
  const { push } = useHistory()

  async function getClientes() {
    try {
      const { data } = await api.get('/clientes')
      setClientes(data)
    } catch (error) {
      alert('Ocorreu um erro ao buscar os items')
    }
  }

  useEffect(() => {
    getClientes()
  }, [])

  const [selectedValue, setSelectedValue] = useState('')

  const buscaClientes = async (event) => {
    setSelectedValue(event.target.value)
    const { data } = await api.get(`/clientes/busca/${event.target.value}`)
    if (data) {
      setClientes(data)
    } else {
      getClientes()
    }
  }

  const limparBusca = (e) => {
    e.preventDefault()
    getClientes()
  }

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid container item xs={12}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => push('/new')}
                >
                  Adicionar
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Paper component="form" className={classes.root2}>
                  <InputBase
                    className={classes.input}
                    placeholder="Buscar cliente"
                    inputProps={{ 'aria-label': 'Buscar clientes' }}
                    value={selectedValue}
                    onChange={buscaClientes}
                  />
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                    onClick={limparBusca}
                  >
                    <Close />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Table data={clientes} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    minHeight: '400px',
  },
  root2: {
    padding: '2px 4px',
    display: 'flex',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

export default Main
