import React, {useState, useEffect} from 'react';
import ListaEventos from './components/ListaEventos';
import Formulario from './components/Formulario';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import './App.css';



function App() {
  const [eventos, setEventos] = useState ([]);

  useEffect (() => {
    const obtenerEventos = async() => {
      try {
        const querySnapshot = await getDocs(collection(db, 'eventos'));
        const eventosFirebase = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEventos(eventosFirebase);
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    };

    obtenerEventos();
  }, []);
    

  return (
    <div className="App">
      <h1>Plataforma de Gestión de Eventos Comunitarios</h1>
      <Formulario eventos={eventos} setEventos={setEventos} />
      <ListaEventos eventos={eventos} setEventos={setEventos}/>
      <footer className="footer">
        <p>© 2025 - Sistema de Gestión de Eventos | Desarrollado por Felipe Rozas</p>
      </footer>
    </div>
  );
}

export default App;
