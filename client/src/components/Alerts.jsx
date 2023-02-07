import { Alert, Stack } from '@mui/material'
import React from 'react'

export const Alerts = ({msg}) => {

  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{msg}</Alert>
    </Stack>
  )
}
