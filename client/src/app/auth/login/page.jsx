'use client';

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardMedia, Button, TextField, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'

export default function login() {
  //import redwhite from '../../../assets/icons/redwhite.png;'

  //'../../../public/redwhite.png;'

  const handleSubmit = (e) => {
    e.preventDefault()
    let post = {
      email: e.target.email_login.value, 
      password: e.target.password_login.value
    }
    axios.post('ruta', post)
    .then(response => {
      console.log(response.data)
      console.log('navigate -> ?')
    })
    .catch(response => {
      console.log('error')
    })

  }


  return (

    <div className='flex justify-center text-center'>
      <Grid2 container spacing={2}>
        <div>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component='img'
              height="100%"
              image='/redwhite.png'
              alt="Mycelium Logo"
            />
            <Typography variant='h4' mt={2}>
              mycelium :)
            </Typography>
            <form className='mt-8 mb-11' onSubmit={handleSubmit}>
              <TextField label="Email" variant="standard" name='email_login'/>
              <TextField label="Password" variant="standard" name='password_login'/>
              <br/>
              <Button 
                className='mt-6' 
                variant="outlined" 
                disableElevation 
                color='secondary'
                type='submit'
              >
                Login
              </Button>
            </form>
          </Card>
        </div>
      </Grid2>
    </div>
  )
}

