import React, { useState } from 'react';
import axios from 'axios';

function Cep() {
  const [cepData, setCepData] = useState(null);
  const [error, setError] = useState(null);
  const [cep, setCep] = useState('');

  const handleCepChange = (event) => {
    setCep(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setCepData(response.data);
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
      <h1>Consulta de CEP</h1>
      <div className="search-container">
        <input
          type="text"
          value={cep}
          onChange={handleCepChange}
          placeholder="CEP"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {cepData && (
        <div className="cep-data">
          <p><strong>CEP:</strong> {cepData.cep}</p>
          <p><strong>Logradouro:</strong> {cepData.logradouro}</p>
          <p><strong>Complemento:</strong> {cepData.complemento}</p>
          <p><strong>Bairro:</strong> {cepData.bairro}</p>
          <p><strong>Localidade:</strong> {cepData.localidade}</p>
          <p><strong>UF:</strong> {cepData.uf}</p>
          <p><strong>IBGE:</strong> {cepData.ibge}</p>
          <p><strong>GIA:</strong> {cepData.gia}</p>
          <p><strong>DDD:</strong> {cepData.ddd}</p>
          <p><strong>SIAFI:</strong> {cepData.siafi}</p>
        </div>
      )}
    </div>
  );
}

export default Cep;
