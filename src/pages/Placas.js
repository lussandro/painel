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
          <table className="user-table">
            <h2>Dados do Veículo</h2>
            <tbody>
              <tr>
                <td><strong>Chassi:</strong></td>
                <td>{veiculoData[0]}</td>
              </tr>
              <tr>
                <td><strong>Placa:</strong></td>
                <td>{veiculoData[1]}</td>
              </tr>
              <tr>
                <td><strong>Ano:</strong></td>
                <td>{veiculoData[2]}</td>
              </tr>
              <tr>
                <td><strong>Cor:</strong></td>
                <td>{veiculoData[3]}</td>
              </tr>
              <tr>
                <td><strong>Modelo:</strong></td>
                <td>{veiculoData[4]}</td>
              </tr>
              <tr>
                <td><strong>Tipo:</strong></td>
                <td>{veiculoData[5]}</td>
              </tr>
              <tr>
                <td><strong>Nacionalidade:</strong></td>
                <td>{veiculoData[6]}</td>
              </tr>
              <tr>
                <td><strong>Classe:</strong></td>
                <td>{veiculoData[7]}</td>
              </tr>
              <tr>
                <td><strong>Motor:</strong></td>
                <td>{veiculoData[8]}</td>
              </tr>
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
}

export default Placas;
