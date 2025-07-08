import React from 'react';

function ListaEventos({ eventos, setEventos}) {
    const eliminarEventos = (index) => {
        const nuevos = eventos.filter((_, i) => i !== index);
        setEventos(nuevos);
    };

    const editarEvento = (index) =>{
        const Formulario = document.querySelector('form');
        Formulario.scrollIntoView({ behavior: 'smooth' });
        const evt = new CustomEvent('editarEvento', { detail: { index} });
        window.dispatchEvent(evt);
     };

     return (
        <div>
            <h2>Eventos Registrados</h2>
            {eventos.length === 0 ? <p>No hay eventos</p> : (
                <ul>
                    {eventos.map((ev, index) => (
                        <li key={index}>
                            <strong>{ev.nombre}</strong>
                            - {ev.tipo}
                            - {ev.fecha}
                            - {ev.asistentes}
                            personas
                            <br />
                            <em>{ev.descripcion}</em>
                            <br />
                            <button onClick={() => editarEvento(index)}>Editar</button>
                            <button onClick={() => eliminarEventos(index)}>Eliminar</button>
                        </li>
                    ))}

                </ul>
            )}
        </div>
    );
}

export default ListaEventos;