import "./App.css";
import React from "react";

import { useState, useEffect } from "react";
const url = "http://localhost:3000/products";

function App() {
  //Aula 1
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  //Resgatando dados
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);

      const data = await res.json();

      setProducts(data);
    }

    fetchData();
  }, []); //Nao há nenhuma depedência específica aqui

  // Aula 2 - Adição de produtos
  const handleSubmit = async (e) => {
    e.preventDefault()
    // // Como os states têm o mesmo nome da chave to objeto, não precis acolocar 'name = name'
    const product = {
      name,
      price
    }

    const res = await fetch(url, { //Segundo parâmetro, diz como vai ser a requisição. O GET é padrão
      method: "POST",
      headers: { //Transmite na transmissão que tipo de conteúdo está sendo manipulado
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product) // Os dados sendo passados, porém o dado principal da requisição é JSON, por isso o dado precisa ir no mesmo formato
    })

    console.log(product);

  };

  console.log(products);
  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price}
          </li>
        ))}
      </ul>
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
          <input type="submit" value="Criar"/>
        </form>
      </div>
    </div>
  );
}

export default App;
