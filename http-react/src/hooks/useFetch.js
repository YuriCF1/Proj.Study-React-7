// FAZENDO A ESTRUTURA DO FETCH REUTILIZÁVEL

import { useEffect, useState } from "react";

//Aula 7 - Custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null); //Já que não sabe o que é ainda, é 'null'. Nem string, nem array

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const inJson = await res.json();

      setData(inJson);
    };

    fetchData();
  }, [url]);

  return { data } //Só dá para exportar uma coisa nos hooks, por isso usa-se o retorno
};
