import React, { useState } from 'react';
import axios from 'axios';

function Cnpj() {
  const [empresaData, setEmpresaData] = useState(null);
  const [error, setError] = useState(null);
  const [cnpj, setCnpj] = useState('');

  const handleInputChange = (event) => {
    setCnpj(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://minhareceita.org/${cnpj}`);
      setEmpresaData(response.data); // Accessing complete data from response
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
      <h1>Consulta de CNPJ</h1>
      <div className="search-container">
        <input
          type="text"
          value={cnpj}
          onChange={handleInputChange}
          placeholder="Digite o CNPJ"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {empresaData && (
        <div className="empresa-data">
          <p><strong>CNPJ:</strong> {empresaData.cnpj}</p>
          <p><strong>Razão Social:</strong> {empresaData.razao_social}</p>
          <p><strong>Nome Fantasia:</strong> {empresaData.nome_fantasia}</p>
          <p><strong>CEP:</strong> {empresaData.cep}</p>
          <p><strong>Logradouro:</strong> {empresaData.logradouro}</p>
          <p><strong>Número:</strong> {empresaData.numero}</p>
          <p><strong>Bairro:</strong> {empresaData.bairro}</p>
          <p><strong>Município:</strong> {empresaData.municipio}</p>
          <p><strong>UF:</strong> {empresaData.uf}</p>
          <p><strong>Porte:</strong> {empresaData.porte}</p>
          <p><strong>Natureza Jurídica:</strong> {empresaData.natureza_juridica}</p>
          <p><strong>Situação Cadastral:</strong> {empresaData.descricao_situacao_cadastral}</p>
          <p><strong>Capital Social:</strong> {empresaData.capital_social}</p>
        </div>
      )}
    </div>
  );
}

export default Cnpj;
