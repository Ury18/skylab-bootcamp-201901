import React from 'react'
import './index.sass'
import {getPokemonId} from '../../utils'


class ItemResult extends React.Component {


    render(){

        const {props: {stringPokemonId, pokemonName, goToDetails}} = this
        let pokemonId = getPokemonId(stringPokemonId)
        const source = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`

        return <div className="card pokemonCard">
            <img src={source} className="card-img-top"/>

            <img className="pokemonCard__pokeball" src="https://cdn4.iconfinder.com/data/icons/pokemon-go/512/Pokemon_Go-01-128.png"/>
            <div className="card-body">
                <p className="card-text">{pokemonName}</p>
                <button onClick={goToDetails} className="btn btn-danger pokemonCard__details">More</button>
            </div>
        </div>
    }
}


export default ItemResult