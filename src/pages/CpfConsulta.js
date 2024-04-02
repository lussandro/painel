import React, { useState } from 'react';
import axios from 'axios';

function CpfConsulta() {
  const [cpf, setCpf] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cpfData, setCpfData] = useState({});
  const [dadosGeraisData, setDadosGeraisData] = useState({});

  const handleInputChange = (event) => {
    setCpf(event.target.value);
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    setCpfData({});
    setDadosGeraisData({});

    try {
      const cpfResponse = await axios.get(`https://api.local/api/consulta_cpf?cpf=${cpf}`);
      setCpfData(cpfResponse.data.complete_data);

      const dadosGeraisResponse = await axios.get(`https://api.local/consulta/${cpf}`);
      setDadosGeraisData(dadosGeraisResponse.data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Erro ao buscar os dados.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className="container">
      <h1>Consulta CPF</h1>
      <div className="search-container">
        <input
          type="text"
          value={cpf}
          onChange={handleInputChange}
          placeholder="Digite o CPF"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
      </div>
      {isLoading && <p>Aguarde buscando dados...</p>}
      {error && <p className="error">{error}</p>}
      {Object.keys(cpfData).length > 0 && Object.keys(dadosGeraisData).length > 0 && (
        <div className="cpf-data">
          <h2><strong>Dados do CPF</strong></h2>
          <table>
            <tbody>
              {Object.entries(cpfData).map(([key, value]) => (
                <tr key={key}>
                  <td><strong>{key}</strong></td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2><strong>Dados Gerais</strong></h2>
          <table>
            <tbody>
              {Object.entries(dadosGeraisData).map(([key, value]) => (
                <tr key={key}>
                  <td><strong>{key}</strong></td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CpfConsulta;
