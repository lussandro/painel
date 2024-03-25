import React, { useState } from 'react';
import axios from 'axios';

function Placas() {
  const [veiculoData, setVeiculoData] = useState(null);
  const [error, setError] = useState(null);
  const [placa, setPlaca] = useState('');

  const handleInputChange = (event) => {
    setPlaca(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://cpf.lussandro.com.br/api/consulta_placa?placa=${placa}`);
      setVeiculoData(response.data.veiculo_data);
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
      <h1>Consulta de Placas</h1>
      <h7>Utilize letras maiusculas sem espaços ou pontos</h7>
      <div className="search-container">
        <input
          type="text"
          value={placa}
          onChange={handleInputChange}
          placeholder="Digite a placa"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {veiculoData && (
        <div className="veiculo-data">
          <p><strong>Chassi:</strong> {veiculoData[0]}</p>
          <p><strong>Placa:</strong> {veiculoData[1]}</p>
          <p><strong>Ano:</strong> {veiculoData[2]}</p>
          <p><strong>Cor:</strong> {veiculoData[3]}</p>
          <p><strong>Modelo:</strong> {veiculoData[4]}</p>
          <p><strong>Tipo:</strong> {veiculoData[5]}</p>
          <p><strong>Nacionalidade:</strong> {veiculoData[6]}</p>
          <p><strong>Classe:</strong> {veiculoData[7]}</p>
          <p><strong>Motor:</strong> {veiculoData[8]}</p>
        </div>
      )}
    </div>
  );
}

export default Placas;
