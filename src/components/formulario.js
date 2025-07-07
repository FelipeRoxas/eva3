import { useState,useEffect } from 'react';

function Formulario({ eventos, setEventos}) {
    const [evento, setEvento] = useState({
        nombre: '',
        asistentes: '',
        tipo: '',
        descripcion: '',
        fecha: ''
    })
    
    const [modoEdicion, setModoEdicion] = useState(false);
    const [idEdicion, setIdEdicion] = useState(null);

    const handleChange = (e) => {
        setEvento({
            ...evento,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!evento.nombre || !evento.tipo || !evento.fecha) {
            return alert ('Completa todos los campos obligatorios');
        }

        if (modoEdicion) {
            const nuevosEventos = eventos.map ((ev, index) =>
                index === idEdicion ? evento : ev
            );
            setEventos(nuevosEventos);
            setModoEdicion(false);
            setIdEdicion(null);
        } else {
            setEventos([...eventos, evento]);
        }

        setEvento({
            nombre: '',
            asistentes: '',
            tipo: '',
            descripcion: '',
            fecha: ''
        });
    };

    useEffect(() => {
        const handleEditar = (e) => {
            const index = e.detail.index;
            setModoEdicion(true);
            setIdEdicion(index);
        };

        window.addEventListener('editarEvento', handleEditar);
        return () => window.removeEventListener('editarEvento', handleEditar);

    },  []);

    useEffect(() => {
        if (modoEdicion && idEdicion !== null) {
            setEvento(eventos[idEdicion]);
        }
    },  [modoEdicion, idEdicion]);

    return (
        <form onSubmit={handleSubmit}>
            <h2>{modoEdicion ? 'Editar Evento': 'Registrar Evento'}</h2>

            <input type="text" name="nombre" placeholder="Nombre del evento" value={evento.nombre} onChange={handleChange} required />
            <input type="number" name="asistentes" placeholder="N°Asistentes" value={evento.asistentes} onChange={handleChange} />

            <select name="tipo" value={evento.tipo} onChange={handleChange} required>
                <option value="">Seleccione tipo</option>
                <option value="Reunion">Reunion</option>
                <option value="Charla">Charla</option>
                <option value="Actividad social">Actividad social</option>
            </select>

            <textarea name="descripcion" placeholder="Descripcion" value={evento.descripcion} onChange={handleChange}></textarea>

            <input type="date" name="fecha" value={evento.fecha} onChange={handleChange} required />
            
            <button type="submit">{modoEdicion ? 'Actualizar' : 'Agregar'}</button>
        </form>
    )

}

export default Formulario;