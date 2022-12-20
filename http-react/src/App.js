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
    e.prevenDefault();
  };

  console.log(products);
  return (
    <div>
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
