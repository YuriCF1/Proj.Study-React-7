// FAZENDO A ESTRUTURA DO FETCH REUTILIZÁVEL

import { useEffect, useState } from "react";

//Aula 7 - Custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null); //Já que não sabe o que é ainda, é 'null'. Nem string, nem array

  // Aula 8 - Refatorando o post
  const [config, setConfig] = useState(null); //Responsável para configurar o método, cabeçalhos...
  const [method, setMethod] = useState(null); //Responsável para configurar o método, GET ou POST
  const [callFetch, setCallFetch] = useState(false); //Dizer quando o fetch for alterado. Usado como dependência

  // Aula 9 - Loading
  const [loading, setLoading] = useState(false);

  // Aula 10 - Tratando erro
  const [error, setError] = useState(null);

  // Aula 11 - DESAFIO
  const [itemId, setItemId] = useState(null);

  // ___________________________________________________________________________________Configuração____________________________________________________________
  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method, //Já que o método já é o post, não precisa fazer 'method: 'POST''. Assimila o valor naturalmente
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod(method);

      // Aula 11 - DESAFIO
    } else if (method === "DELETE") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
      }); //O DELETE NÂO POSSUI BODY, POIS NÃO HÁ DADOS

      setMethod(method);
      setItemId(data);
    }
  };

  // _____________________________________________________________________________________Fetch__________________________________________________________
  // GET QUANDO O POST FOR CONCLUÍDO
  useEffect(() => {
    const fetchData = async () => {
      // Aula 9 - loading
      setLoading(true);

      try {
        const res = await fetch(url);
        const inJson = await res.json();

        setData(inJson);

        setLoading(false);
      } catch (error) {
        console.log(error.message); //Mostrar a mensagem de erro
        setError("Houve algum erro na tentativa de carregamento dos dados");
      }
    };

    fetchData();
  }, [url, callFetch]);

  // ______________________________________________________________________________Requerimento_________________________________________________________________
  //Aula 8 - Refatorando o post
  useEffect(() => {
    const httpRequest = async () => {
      let json;

      if (method === "POST") {
        let fetchOptions = [url, config]; //Pode pegar uma url diferente e uma configuração diferente        const res = await fetch(...fetchOptions);
        const res = await fetch(...fetchOptions);
        json = await res.json();

        setCallFetch(json);
      } else if (method === "DELETE") {
        const deleteUrl = `${url}/${itemId}`;
        const res = await fetch(deleteUrl, config);
        json = await res.json();
      }
      setCallFetch(json);
    };

    httpRequest();
  }, [config]);

  // ______________________________________________________________________________Retorno_________________________________________________________________
  //Só dá para exportar uma coisa nos hooks, por isso usa-se o retorno
  return { data, httpConfig, loading, error }; // Já que o terceiro hook é dependente da configuração, só precisa exportar o primeiro. Caso o primeiro mude, o terceiro reinicia
};
