import React, {useState, useEffect} from 'react';
import listaeventos from './components/listaeventos';



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
      <listareventos eventos={eventos} setEventos={setEventos}/>
    </div>
  );
}

export default App;
