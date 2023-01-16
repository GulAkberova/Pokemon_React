import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../store/reducers/pokemonSlice';

function PokemonList() {
    let dispatch = useDispatch();
    
    let { loading, error, pokemon} = useSelector(state => state.pokemonReducer);

    useEffect(() => {

        dispatch(fetchTodos());


    }, [])
    const [clicked, setClicked]=useState(false)
    const [pokemonDetail, setPokemonDetail] = useState([]);
    const getDetail = async (url) => {
      const res = await axios.get(url);
     const data = res.data;
      setClicked(true)
      setPokemonDetail(data);
    };
    // const[items, setItems]=useState([])
  const handlePageClick=(data)=>{
    // console.log(data.selected)
    let currentPage=data.selected +1
    const commentFormServer = dispatch(fetchTodos(currentPage))
//     setItems(commentFormServer)
//   console.log(commentFormServer)


  }
  return (
    <>
    <div className='pokemon_bigdiv'>
   <div>
   {
        loading ? <h1>Loading...</h1>:
        <>
        {
           pokemon.results
           && pokemon.results

           .map((index, key)=>
          (

            <div key={index.id} className='pokemon_minidiv' onClick={()=>getDetail(index.url)}>
                <p>{key + 1}</p>

              <img   src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        key + 1
                      }.png`}/>
                  <p>{index.name.toUpperCase()}</p>

            </div>
           ))

        }
        </>

    }
   </div>
 
 {
    clicked ? (
        <>
        <div className='pokemon_detail_bigdiv'>
        <h1> {pokemonDetail.name.toUpperCase()}</h1>
        <img
               
                src={pokemonDetail.sprites.front_default}
                
              />
              <div className='pokemon_datil_btns'>
                <button>{pokemonDetail.abilities[0]?.ability.name}</button>
                <button>{pokemonDetail.abilities[1]?.ability.name}</button>
              </div>
              <div className='pokemon_detail_info'>
                {pokemonDetail.stats.map((powers) => {
                  return (
                    <p>
                      {powers.stat.name.toUpperCase()} : {powers.base_stat}
                    </p>
                  );
                })}
              </div>
        </div>

        </>
    ) : <h1>sdhfhrd</h1>
 }
</div>
<ReactPaginate
 previousLabel={'previous'}
 nextLabel={'next'}
 breakLabel={'sfd'}
 pageCount={5}
 marginPagesDisplayed={3}
pageRangeDisplayed={6}
onPageChange={handlePageClick}


/>
    </>
  )
}

export default PokemonList