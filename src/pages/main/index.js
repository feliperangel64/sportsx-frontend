import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper, Button } from '@material-ui/core'
import api from '../../services/api'
import Table from '../../components/Table'
import { useHistory } from 'react-router'

const Main = () => {
  const classes = useStyles()
  const [clientes, setClientes] = useState([])
  const { push } = useHistory()

  useEffect(() => {
    async function getClientes() {
      try {
        const { data } = await api.get('/clientes')
        setClientes(data)
      } catch (error) {
        alert('Ocorreu um erro ao buscar os items')
      }
    }
    getClientes()
  }, [])

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => push('/new')}
              >
                Adicionar
              </Button>
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
}))

export default Main
