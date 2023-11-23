import React, { useState, useEffect } from "react";
import Filme from "../filme/Filme";
import axios from "axios";
import './Main.css';

type FilmesType = {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
};

export default function Main() {
  const [filmes, setData] = useState<FilmesType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3000/filmes')
      .then(response => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch(error => {
        console.error("Erro", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTexto(e.target.value);
  };

  if (loading) return "loading...";
  if (error) return "error";

  return (
    <>
      <div className="pesquisa">
        <p>Buscar Filme</p>
        <input className='barrapesquisa' type="text" onChange={handleTextChange} />
        <div>
          <p className='texto_digitado'>pesquisa: {texto}</p>
        </div>
      </div>
      <main className="content-main">
        {filmes &&
          filmes
            .filter((filme) => filme.titulo.toLowerCase().includes(texto.toLowerCase()))
            .map((filme) => (
              <Filme key={filme.id} titulo={filme.titulo} descricao={filme.descricao} imagem={filme.imagem} />
            ))}
      </main>
    </>
  );
}


// import React, { useState,useEffect } from "react";
// import Filme from "../filme/Filme";
// import axios from "axios"
// import './Main.css'
// type FilmesType = {
//     id: number,
//     titulo:string,
//     descricao:string,
//     imagem:string
// }
// export default function Main(){
//     const[filmes, setData] = useState(null);
//     const[loading, setLoading] = useState (true);
//     const [error, setError] = useState (null);

//     useEffect(() =>{
//         fetch('http://localhost:3000/filmes')
//         .then(response =>{
//             if (response.ok){
//                 return response.json()
//             }
//             throw response;
//         })
//         .then(filmes => {
//             setData(filmes);

//         })
//         .catch(error => {
//             console.error("Erro", error);
//             setError(error);
//         })
//         .finally(() =>{
//             setLoading(false);
//         })
//     }, [])
//     if(loading) return "loading...";
//     if(error)return "vish erro"
//     return(
//         <>

//         </>
//     )



//     const URL = "http://localhost:3000/filmes"

//     const filmes:FilmesType[] = [
//         {
//             id:1,
//             titulo:"Barbie",
//             descricao:"Depois de ser expulsa da Barbieland por ser uma boneca de aparência menos do que perfeita, Barbie parte para o mundo humano em busca da verdadeira felicidade.",
//             imagem:"/barbie.png"
//         },
//         {
//             id:2,
//             titulo:"Transformers Maiza",
//             descricao:"Depois de ser expulsa da Barbieland por ser uma boneca de aparência menos do que perfeita, Barbie parte para o mundo humano em busca da verdadeira felicidade.",
//             imagem:"/transformes.jpeg"
//         },
//         {
//             id:3,
//             titulo:"Transformers Maiza",
//             descricao:"Depois de ser expulsa da Barbieland por ser uma boneca de aparência menos do que perfeita, Barbie parte para o mundo humano em busca da verdadeira felicidade.",
//             imagem:"/transformes.jpeg"
//         }

//     ]
//     //A função recebe um atributo chamado e de "event"
//     function mudaTexto(e:React.ChangeEvent<HTMLInputElement>){
//         console.log(e.target.value)
//         setTexto(e.target.value)
//     }
//     return(
//         <>
//             <div className="pesquisa">
                
//                 <p>Buscar Filme</p>
//                 <input className='barrapesquisa' type="text" onChange={mudaTexto} />
//                 <div>
//                     <p className='texto_digitado'>pesquisa: {texto}</p>
//                 </div>
//             </div>
//             <main className="content-main">
//                 {filmes
//                 .filter((filme)=>filme.titulo.toLowerCase().includes(texto.toLowerCase()))
//                 .map((filme:FilmesType)=>
//                     <Filme key={filme.id} 
//                            titulo={filme.titulo} 
//                            sinopse={filme.descricao} 
//                            imagem={filme.imagem}
//                     />
//                     )
//                 }
//             </main>
//         </>
//     )
// }