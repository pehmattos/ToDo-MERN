import "./App.css";
import React, { useState, useEffect } from "react";
import Item from "./components/item";
// import dotenv from 'dotenv';
// dotenv.config();
const url = process.env.REACT_APP_API_URL || process.env.REACT_APP_URL ;

function App() {
  // State changes -  when add something
  const [itens, setItens] = useState([]);
  const [filterItens, setFilterItens] = useState({ filter: false, active: true })

  // Capturar Dados
  function getData() {
    fetch(`${url}/list`, { method: "GET" })
      .then((res) => res.json(res))
      .then((data) => setItens(data)) // when setItens work change the state of /list
      .catch((err) => console.log(err))
  }

  // Inserir Dados
  function insertDocument(item) {
    fetch(`${url}/add`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "text": "", "active": true }),
    })
      .then((res) => res.json)
      .then(() => getData())
      .catch((err) => console.log(err));
  }

  // Atualizar Dados
  function updateDocument(item) {
    fetch(`${url}/update`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
      .then((res) => res.json)
      .then(() => getData())
      .catch((err) => console.log(err));
  }

  // Deleta Dados
  function deleteDocument(item) {
    fetch(`${url}/delete`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
      .then((res) => res.json)
      .then(() => getData())
      .catch((err) => console.log(err));
  }

  // Side effects - while the window load
  useEffect(() => {
    getData();
  }, []);

  const itensToShow = filterItens.filter ? itens.filter(item => item.active === filterItens.active) : itens

  // JSX - a pagina
  return (
    <div className="wrapper">
      <div className="to-do-list">
        <h1 className="title">To Do App</h1>
        {
          itensToShow.map((item, index) => {
            return (<Item key={index} item={item} updateDocument={updateDocument} deleteDocument={deleteDocument} />)
          })
        }
        <div className="buttonRow">
          <button onClick={() => setFilterItens({ filter: false })} style={filterItens.filter ? {} : { fontWeight: "bold" }}>Todos</button>

          <button onClick={() => setFilterItens({ filter: true, active: true })} style={((filterItens.filter) && (filterItens.active) === true) ? { fontWeight: "bold" } : {}}>Concluidos</button>

          <button onClick={() => setFilterItens({ filter: true, active: false })} style={((filterItens.filter) && (filterItens.active) === false) ? { fontWeight: "bold" } : {}}>Pendentes</button>
        </div>
        <div className="buttonRow">
          <button onClick={insertDocument}>Inserir novo to-do</button>
        </div>
      </div>
    </div>
  )
}
// {} permite inserir o javascript no jsx (como script em html)
// () => {} callback( funcao chama funcao) é necessário pois está sempre sendo executada quando a página sofre uma renderização.

export default App;
