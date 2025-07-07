import React, {useState, useEffect} from 'react';
import Listareventos from './components/Listaeventos';
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
    localStorage.setItem('eventos' ,JSON.stringify(eventos));
  }, [eventos]);

  return (
    <div class name="App">
      <h1>Gestion de eventos comunitarios</h1>
      <Formulario eventos={eventos} setEventos={setEventos} />
      <Listareventos eventos={eventos} setEventos={setEventos}/>
    </div>
  );
}

export default App;
