
import { db } from './config';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"; 


export const guardarRegistro = async(nombre, email, edad, empresa, calzado) =>{

    try {
      const docRef = await addDoc(collection(db, "ventas"), { nombre, email, edad, empresa, descuento_activo: true, calzado  });
    //   console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export const obtenerDistribuidor = async() =>{

    try {
        const datos = await getDocs(collection(db, 'distribuidores'));
        return datos;
        
    } catch (error) {
        console.log(error)        
    }
}

export const obtenerCalzados = async(id) =>{
  try {
      const datos = await getDocs(collection(db, `distribuidores/${id}/calzados`));
      return datos;
      
  } catch (error) {
      console.log(error)        
  }
}

export const checkEmailExists = async (email) => {
  try {
    const q = query(collection(db, "ventas"), where("email", "==", email));
    const snapshot = await getDocs(q);
    // const snapshot = await db.collection('ventas').where('email', '==', email).get();
    if (!snapshot.empty) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}