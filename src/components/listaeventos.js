import React from "react";

function listaeventos({ eventos, setEventos}) {
    const eliminarEventos = (index) => {
        const nuevos = eventos.filter((_, i) => i !== index);
        setEventos(nuevos);
    };

    const editarEvento = (index) =>{
        const eventos = eventos[index];
        
    }
}