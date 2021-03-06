import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]); //[nome_do_statu, função_para_atualizar] | melhor maneira de iniciar um statu é com uma lista vazia

    useEffect( () => { //carrega uma função assim que ele carrega 
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            setSpots(response.data);
            //console.log(response.data);
        }

        loadSpots(); //chamando a função carregar Spots
    }, []); //neste array é onde colocamos o filtro, sempre que o filtro é alterado ela é executada novamente, quando vem  vazio é para indicar que só irá executar uma única vez


    return (
       <>
            <ul className="spot_list">
                {spots.map(spot => (
                    <li key={spot._id}> {/* chave única para facilitar encontrar a lista */}
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$ ${spot.price} /dia` : 'GRATUITO' }</span> {/* IF ternário (IF "?"  isso  ": " representando ELSE) */}
                    </li>
                ))}
            </ul>

            <Link to="/new">  {/* Link serve para criar links para redirecionar usuário para página que queremos */}
              <button className="btn">Cadastrar novo Spot</button> 
            </Link>
       </> 
    )
}