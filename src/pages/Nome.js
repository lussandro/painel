import React, { useState } from 'react';
import axios from 'axios';

function ConsultaNome() {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [nome, setNome] = useState('');

  const handleInputChange = (event) => {
    setNome(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://65.21.240.99:5000/api/consulta_nome?nome=${nome}`);
      setUserData(response.data); // Setting received data to state
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Nome não encontrado!');
      setUserData([]); // Resetting user data on error
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container">
      <h1>Consulta por Nome</h1>
      <div className="search-container">
        <input
          type="text"
          value={nome}
          onChange={handleInputChange}
          placeholder="Digite o nome"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {userData.length > 0 && (
        <div className="user-data">
          <h2>Resultados</h2>
          <table>
            <thead>
              <tr>
                <th>CPF</th>
                <th>Data de Nascimento</th>
                <th>Nome da Mãe</th>
                <th>RG</th>
                <th>Nacionalidade</th>
                <th>Título de Eleitor</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td>{user[1]}</td>
                  <td>{formatDate(user[2])}</td>
                  <td>{user[3]}</td>
                  <td>{user[4]}</td>
                  <td>{user[5]}</td>
                  <td>{user[6]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ConsultaNome;
