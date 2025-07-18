import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function ListaEventos({ eventos, setEventos }) {
  const eliminarEventos = async (index) => {
    const evento = eventos[index];
    if (evento?.id) {
      await deleteDoc(doc(db, 'eventos', evento.id));
      const nuevos = eventos.filter((_, i) => i !== index);
      setEventos(nuevos);
    }
  };
    const editarEvento = (index) => {
        const form = document.querySelector('form');
        form.scrollIntoView({ behavior: 'smooth' });
        const evt = new CustomEvent('editarEvento', { detail: { index } });
        window.dispatchEvent(evt);
    };

 return (
    <div className="lista-container">
      <h2 className="titulo-eventos">📋 Eventos Registrados</h2>
      {eventos.length === 0 ? (
        <p className="sin-eventos">No hay eventos</p>
      ) : (
        <div className="tarjetas-eventos">
          {eventos.map((ev, index) => (
            <div className="tarjeta-evento" key={ev.id}>
              <div className="evento-cabecera">
                <h3 className="evento-nombre">{ev.nombre}</h3>
                <span className="evento-tipo">{ev.tipo}</span>
              </div>
              <div className="evento-detalles">
                <p><strong>📅 Fecha:</strong> {ev.fecha}</p>
                <p><strong>👥 Asistentes:</strong> {ev.asistentes}</p>
                {ev.descripcion && (
                  <p className="evento-descripcion">📝 {ev.descripcion}</p>
                )}
              </div>
              <div className="evento-acciones">
                <button onClick={() => editarEvento(index)} className="btn-editar">✏️ Editar</button>
                <button onClick={() => eliminarEventos(index)} className="btn-eliminar">🗑️ Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaEventos;