import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function Formulario({ eventos, setEventos }) {
  const [evento, setEvento] = useState({
    nombre: '',
    asistentes: '',
    tipo: '',
    descripcion: '',
    fecha: ''
  });

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEdicion, setIdEdicion] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!evento.nombre || !evento.tipo || !evento.fecha || isNaN(evento.asistentes) || evento.asistentes < 0) {
      return alert('Completa todos los campos obligatorios');
    }

    try {
      if (modoEdicion && idEdicion !== null) {
        const eventoDoc = eventos[idEdicion];
        const eventoRef = doc(db, 'eventos', eventoDoc.id);
        await updateDoc(eventoRef, evento);

        const nuevosEventos = [...eventos];
        nuevosEventos[idEdicion] = { id: eventoDoc.id, ...evento };
        setEventos(nuevosEventos);

        setModoEdicion(false);
        setIdEdicion(null);
      } else {
        const docRef = await addDoc(collection(db, 'eventos'), evento);
        setEventos([...eventos, { id: docRef.id, ...evento }]);
      }

      setEvento({
        nombre: '',
        asistentes: '',
        tipo: '',
        descripcion: '',
        fecha: ''
      });
    } catch (error) {
      console.error('Error al guardar el evento:', error);
    }
  };

  useEffect(() => {
    const handleEditar = (e) => {
      const index = e.detail.index;
      setModoEdicion(true);
      setIdEdicion(index);
    };

    window.addEventListener('editarEvento', handleEditar);
    return () => window.removeEventListener('editarEvento', handleEditar);
  }, []);

  useEffect(() => {
    if (modoEdicion && idEdicion !== null && eventos[idEdicion]) {
      setEvento(eventos[idEdicion]);
    }
  }, [modoEdicion, idEdicion, eventos]);

  return (
    <form onSubmit={handleSubmit} className="formulario">
    <h2>{modoEdicion ? 'Editar Evento' : 'Registrar Evento'}</h2>

    <div className="form-grid">
        <div>
            <label>Nombre del evento</label>
            <input type="text" name="nombre" value={evento.nombre} onChange={handleChange} required />

            <label>N° Asistentes</label>
            <input type="number" name="asistentes" value={evento.asistentes} onChange={handleChange} />
        </div>

        <div>
        <label>Tipo de evento</label>
        <select name="tipo" value={evento.tipo} onChange={handleChange} required>
            <option value="">Seleccione tipo</option>
            <option value="Reunión">Reunión</option>
            <option value="Charla">Charla</option>
            <option value="Actividad social">Actividad social</option>
        </select>

        <label>Fecha</label>
        <input type="date" name="fecha" value={evento.fecha} onChange={handleChange} required />
        </div>
    </div>

    <label>Descripción</label>
        <textarea name="descripcion" value={evento.descripcion} onChange={handleChange}></textarea>

        <button type="submit">{modoEdicion ? 'Actualizar' : 'Agregar'}</button>
    </form>

  );
}

export default Formulario;