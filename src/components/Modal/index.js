import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons/'
import api from '../../services/api'

export default function AlertDialog({ id }) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    await api.delete(`/clientes/${id}`)
    handleClose()
    window.location.reload()
  }

  return (
    <div>
      <Delete
        onClick={handleClickOpen}
        style={{ cursor: 'pointer' }}
        color="secondary"
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Excluir cliente</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir este cliente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

AlertDialog.propTypes = {
  id: PropTypes.any,
}
