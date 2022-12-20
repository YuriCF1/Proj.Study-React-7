import "./App.css";
import React from "react";

import { useState, useEffect } from "react";
const url = "http://localhost:3000/products";

function App() {
  //Aula 1
  const [products, setProducts] = useState([]);

  //Resgatando dados
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);

      const data = await res.json();

      setProducts(data);
    }

    fetchData();
  }, []);
  //Nao há nenhuma depedência específica aqui

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
    </div>
  );
}

export default App;
