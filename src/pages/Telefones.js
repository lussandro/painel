import React, { useState } from 'react';
import axios from 'axios';

function Telefones() {
  const [telefoneData, setTelefoneData] = useState(null);
  const [error, setError] = useState(null);
  const [ddd, setDdd] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleDddChange = (event) => {
    setDdd(event.target.value);
  };

  const handleTelefoneChange = (event) => {
    setTelefone(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://cpf.lussandro.com.br/api/consulta_telefone?ddd=${ddd}&telefone=${telefone}`);
      setTelefoneData(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Erro ao buscar os dados: ${error.message}`);
    }
  };

  const handleSearch = () => {
    fetchData();
  };


  return (
    <div className="container">
      <h1>Consulta de Telefones</h1>
      <h7>Digite o DDD sem o zero</h7>
      <div className="search-container">
        <input
          type="text"
          value={ddd}
          onChange={handleDddChange}
          placeholder="DDD"
          className="search-input ddd-input" // Adicionando a classe ddd-input
        />
        <input
          type="text"
          value={telefone}
          onChange={handleTelefoneChange}
          placeholder="Telefone"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {telefoneData && (
        <div className="telefone-data">
          <p><strong>DDD:</strong> {telefoneData[0]}</p>
          <p><strong>Telefone:</strong> {telefoneData[1]}</p>
          <p><strong>CPF/CNPJ:</strong> {telefoneData[2]}</p>
          <p><strong>Nome:</strong> {telefoneData[3]}</p>
          <p><strong>Tipo:</strong> {telefoneData[4]}</p>
          <p><strong>Logradouro:</strong> {telefoneData[5]}</p>
          <p><strong>Número:</strong> {telefoneData[6]}</p>
          <p><strong>Bairro:</strong> {telefoneData[7]}</p>
          <p><strong>CEP:</strong> {telefoneData[8]}</p>
          <p><strong>Cidade:</strong> {telefoneData[9]}</p>
          <p><strong>Estado:</strong> {telefoneData[10]}</p>
        </div>
      )}
    </div>
  );
}

export default Telefones;
