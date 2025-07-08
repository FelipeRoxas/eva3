import React, {useState, useEffect} from 'react';
import ListaEventos from './components/ListaEventos';
import Formulario from './components/Formulario';

function App() {
  const [eventos, setEventos] = useState ([]);

  useEffect (() => {
    const datos= localStorage.getItem('eventos');
    if (datos) {
      setEventos(JSON.parse(datos));
    }
  }, []);

  useEffect(() => {
    console.log("Guardado de eventos:", eventos);
    localStorage.setItem('eventos' ,JSON.stringify(eventos));

    const verificacion = localStorage.getItem('eventos');
    console.log("Contenidode localStorage:", verificacion)
  }, [eventos]);

  return (
    <div className="App">
      <h1>Gestion de Eventos Comunitarios</h1>
      <Formulario eventos={eventos} setEventos={setEventos} />
      <ListaEventos eventos={eventos} setEventos={setEventos}/>
    </div>
  );
}

export default App;
