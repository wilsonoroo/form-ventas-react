import {  Avatar, Button, Checkbox, CircularProgress, FormControlLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import {useFormik} from 'formik';
import { useEffect, useState } from 'react';
import { guardarRegistro,  obtenerCalzados,  obtenerDistribuidor, checkEmailExists } from '../firebase/regService'
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import miImagen from './somti.png'
import * as Yup from 'yup';


export const RegisterPage = () => {

  
  const { id } = useParams();
  const labelRef = useRef()
  const [distribuidores, setDistribuidores] = useState(obtenerDistribuidor);
  const [loading, setLoading] = useState(true);  
  const [calzados, setCalzados] =useState([]);
  const [selectedGrid, setSelectedGrid] = useState(null);
  // const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/somti-ventas.appspot.com/o/somti.png?alt=media&token=2cb32622-94aa-442b-81ec-71c36f93151a';
  // const imageUrl = '../../assets/images/somti.png';
  
  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(15, 'El nombre debe tener menos de 15 caracteres')
      .required('El nombre es requerido')
      .test('no-numbers', 'El nombre no puede tener numeros', value => !/\d/.test(value)),
    edad: Yup.number()
      .min(1, 'La edad debe ser mayor a 1')
      .max(110, 'La edad debe ser menor a 110')
      .required('La edad es requerida'),
    email: Yup.string()
      .email('El correo electrónico debe ser válido')
      .required('El correo electrónico es requerido')
      .test('email-exists', 'Este correo ya esta en uso', checkEmailExists),
    empresa: Yup.string()
      .min(1, 'Ingrese su empresa o rubro')
      .max(30, 'debe tener menos de 30 caracteres')
      .required('Este campo es requerido'),
    calzado: Yup.string()
     .required('Selecciona 1 calzado'),
  });

  const { handleChange, values, handleSubmit, errors, touched, resetForm} = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      edad: '',
      empresa: '',
      calzado:'',
    },
    
    onSubmit: (values) => {
      console.log(values)
      guardarRegistro(values.nombre, values.email, values.edad, values.empresa, values.calzado );
      Swal.fire({
        title: '¡Enviado!',
        text: 'Tu formulario ha sido enviado con éxito.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      resetForm();
    },
    validationSchema,
  
    
  });  
 useEffect(() => {
  setDistribuidores([]);
  setCalzados([]);
  obtenerDistribuidor().then((distribuidores) => distribuidores.forEach((element) => {
    setDistribuidores((old) => [...old, element])
    setLoading(false);
    // console.log(distribuidores)
  }));
  // setLoading(false);
  obtenerCalzados(id).then((calzados) => calzados.forEach((element) => {
    setCalzados((old) => [...old, element])
    // console.log(calzados)
  }));
  }, [])   
  
  const handleGridClick = (nombreCalzado) => {
    // console.log("Calzado seleccionado: ", nombreCalzado);
    handleChange({target: {name: "calzado", value: nombreCalzado}});
  }
  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' , backgroundColor: 'black'}}>
          <CircularProgress />
        </div>
      ) : (
        
        <Grid container
          spacing={ 0 }
          direction="column"
          alignItems="center"    
          justifyContent="center"
          sx={{ minHeight: '100vh', backgroundColor: 'black', padding: 0}}
        >
          <Grid container>
            <Grid item xs={ 12} sx={{mt:10}}>
              <img src={miImagen} style={{  display: 'block', margin: '0 auto'  }} alt='json'/>
            </Grid>
          </Grid>
          <Grid item xs={ 12 } sx={{ mb:2 }}>         
            <Typography color="#FAA300" opacity='100%' variant='h4'  fontFamily="Impact" fontWeight="40"sx={{ mt:2 }}>Registrate</Typography>         
          </Grid>


          <Grid item         
            // spacing={ 0 }
            className='box-shadow'
            // color="black"
            xs={ 3 }
            sx={{ width: { sm: 500 }, padding: 2, borderRadius: 2 }}
          >  
            {distribuidores.length > 0  ? (
            distribuidores.map((Distribuidor, i) => (
              <div key={Distribuidor.id}>
              {id === Distribuidor.id && (
              <Typography ref={labelRef} color='white'  textAlign="center" variant='h5' sx={{ mb:1 }}  > Su Empresa Tiene un {Distribuidor.data().descuento}% de descuento </Typography>
              )}
              </div>
            ))                           
            ) : (
              null
            )} 
            <form onSubmit={ handleSubmit }>
              <Grid container>
                <Grid item xs={12} sx={{ mt: 2, backgroundColor: 'white', borderRadius: 1}} >
                  <TextField
                    label= "Nombre"
                    type="text"
                    name='nombre'
                    placeholder='Indica tu Nombre'
                    fullWidth
                    onChange= {handleChange}
                    value= {values.nombre}
                    id ='nombre'
                    variant='filled'
                    // InputLabelProps={{
                    //   style: {color: 'black'}
                    // }}
                    focused
                  />           
                </Grid> 
                <Grid container>
                  <Grid item xs={12}>
                    { touched.nombre && errors.nombre && <div className="error">{errors.nombre}</div>}
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2, backgroundColor: 'white', borderRadius: 1}}>
                  <TextField
                    label= "Edad"
                    type="number"
                    name="edad"
                    placeholder='Indica tu edad'
                    fullWidth
                    // inputProps={{ inputMode: 'numeric', pattern: '[1-9]*' }}
                    onChange= {handleChange}
                    value= { values.edad } 
                    id = 'edad'
                    variant='filled'
                    focused                
                  />           
                </Grid> 
                <Grid container>
                  <Grid item xs={12} >
                    { touched.edad && errors.edad && <div className="error">{errors.edad}</div>}
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2, backgroundColor: 'white', borderRadius: 1}}>
                  <TextField
                    label= "Correo Electrónico"
                    type="email"
                    name="email"
                    placeholder='Indica tu correo electrónico'
                    fullWidth
                    onChange= {handleChange}
                    value= { values.email } 
                    id ='email'
                    variant='filled'
                    focused
                  />           
                </Grid>                
                <Grid container>
                  <Grid item xs={12}>
                    {touched.email && errors.email && <div className="error">{errors.email}</div>}
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2, backgroundColor: 'white', borderRadius: 1}}>
                  <TextField
                    label= "Empresa o rubro"
                    type="text"
                    name='empresa'
                    placeholder='Dónde Trabajas o a qué te dedicas?'
                    fullWidth
                    onChange= {handleChange}
                    value= {values.empresa}
                    id ='nombre'
                    variant='filled'
                    focused
                  />           
                </Grid>      
                <Grid container>
                  <Grid item xs={12}>
                    { touched.empresa && errors.empresa && <div className="error">{errors.empresa}</div>}
                  </Grid>
                </Grid>                 
                <Grid container>
                  <Grid item xs={12} textAlign="center" sx={{ mt: 4 }}>         
                    <Typography variant='h4' color="#FAA300"  fontFamily="Impact" fontWeight="40">Nuestras Zapatillas</Typography>         
                  </Grid>
                </Grid>
                
                <Grid container  sx={{mt: 4, mb:4}}>  
                {calzados.length > 0  ? (
                  calzados.map((calzado) => (
                    <Grid
                    item
                    textAlign="center"
                    key={calzado.id}
                    color="#FAA300"                    
                    xs={6}
                    name='calzado'
                    onClick={() => {
                      setSelectedGrid(calzado.id);
                      handleGridClick(calzado.data().nombre);
                    }}
                    // className={calzado.id === selectedGrid ? 'selected-grid' : ''}
                    >
                  {/* {calzado.data().nombre}                   */}
                  <img 
                    src={calzado.data().image} 
                    style={{ display: 'block', margin: '0 auto', width: '100%', height: '100%' }}
                    alt={calzado.nombre}   
                    className={calzado.id === selectedGrid ? 'selected-img' : ''}       
                  />
                  </Grid>    
                ))
                ): (null)
                }
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    { touched.calzado && errors.calzado && <div className="error">{errors.calzado}</div>}
                  </Grid>
                </Grid>        
                <Grid container sx={{ mt: 4, mb:10 }} >
                  <Grid item xs={12}>
                    <Button                       
                      style={{ width: 150, height: 50, display: "block", margin: "0 auto", fontSize: 20}}
                      type='submit' 
                      variant='contained' 
                      sx={{ backgroundColor: "#FF8206", "&:hover": {backgroundColor: "#FAA300"} }}
                      fontWeight="bold"
                      fontFamily="Poppins" 
                      >
                        Aceptar
                    </Button>
                  </Grid>
                </Grid>     
              </Grid>                 
            </form> 
          </Grid>                   
        </Grid>
      )}


    </>
  )
}
