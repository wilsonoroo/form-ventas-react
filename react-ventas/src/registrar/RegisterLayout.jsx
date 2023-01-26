import { Grid, Typography } from '@mui/material';


export const RegisterLayout = ({ children, title = '' }) => {
  return (
    
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'black', padding: 4}}
    >
      <Grid item xs={ 3 } sx={{ backgroundColor: 'black', mb:2 }}>         
        <Typography color="#FAA300" variant='h5' sx={{  backgroundColor: 'BLACK'}}>somti</Typography>         
      </Grid>
      <Grid item xs={ 3 } sx={{ backgroundColor: 'black', mb:2 }}>         
        <Typography color="#FAA300" variant='h4' sx={{  backgroundColor: 'BLACK'}} fontFamily="Roboto" fontWeight="bold">REGISTRATE</Typography>         
      </Grid>



      <Grid item
       className='box-shadow'
       xs={ 3 }
       sx={{ 
            width: { sm: 450 },
            backgroundColor: 'white', 
            padding: 3, 
            borderRadius: 2 
        }}>
          
          <Typography variant='h5' sx={{ mb: 1 }}>{ title }</Typography>

            
            { children }

      </Grid>
      <Grid item xs={ 3 } sx={{ backgroundColor: 'black', mt:2 }}>         
        <Typography color="#FAA300" variant='h4' sx={{  backgroundColor: 'BLACK'}} fontFamily="Roboto" fontWeight="bold">NUESTRAS ZAPATILLAS</Typography>         
      </Grid>

      <Grid>
        
      </Grid>
  
    </Grid>

  )
}