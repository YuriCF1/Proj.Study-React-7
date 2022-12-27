import "./App.css";
import React from "react";

import { useState, useEffect } from "react";

// Aula 7 - Custom Hook
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

function App() {
  //Aula 1
  const [products, setProducts] = useState([]);

  // Método 2 - Custom Rook
  //Aula 4 - Custom hook
  const { data: items, httpConfig, loading, error } = useFetch(url); //Diz o que está esperando de retorno, e depois diz de onde tá vindo
  // Renomeando a propriedade

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Método 1 - Rook nativo
  //Resgatando dados
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(url);

  //     const data = await res.json();

  //     setProducts(data);
  //   }

  //   fetchData();
  // }, []); //Nao há nenhuma depedência específica aqui

  // Aula 2 - Adição de produtos
  const handleSubmit = async (e) => {
    e.preventDefault();
    // // Como os states têm o mesmo nome da chave to objeto, não precis acolocar 'name = name'
    const product = {
      name,
      price,
    };

    // const res = await fetch(url, { //Segundo parâmetro, diz como vai ser a requisição. O GET é padrão
    //   method: "POST",
    //   headers: { //Transmite na transmissão que tipo de conteúdo está sendo manipulado
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(product) // Os dados sendo passados, porém o dado principal da requisição é JSON, por isso o dado precisa ir no mesmo formato
    // })

    // console.log(product);

    // //Aula - 6 = Carregamento dinâmico
    // const addedProduct  = await res.json() //Transformando o rest em um objeto. Pois anteriormente ele estava como string em json
    // setProducts((prevProducts) => [...prevProducts, addedProduct])

    httpConfig(product, "POST");

    setName("");
    setPrice("");
  };

  // Aula 11 - DESAFIO
  const handleRemove = (id) => {
    httpConfig(id, "DELETE");

  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {/* Aula 9 - loading */}
      {/* Substituir depois pela animação de carregamento? */}
      {/* {loading && <p>Carregando os dados...</p>} */}
      {/* <div>  */}
      {(() => {
        if (loading && !error) {
          return <p>Carregando os dados...</p>;
        } else {
          return <p>{error}</p>;
        }
      })()}
      {/* </div> */}
      {/* {error && <p>{error}</p>} */}
      {!error && (
        <ul>
          {/* {products.map((product) => ( */}
          {items &&
            items.map((
              product //Inicialmente, o items é nulo, o if resolveu
            ) => (
              <li key={product.id}>
                {product.name} - R$: {product.price}
                {/* Quando tem que mandar alguma parâmetro na função do onClick, tem que ser por arrow function */}
                <button style={{marginLeft: "1em"}} onClick={() => handleRemove(product.id)}> 
                  Deletar
                </button>
              </li>
            ))}
        </ul>
      )}
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <input type="submit" value="Criar" />
        </form>
      </div>
    </div>
  );
}

export default App;
