import { useState,useEffect } from "react";

function formulario({ eventos, setEventos}) {
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
            ...evento
            [e.target.name]: e.target.value
        });
    };

    const handleSumit = (e) => {
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


    }

}