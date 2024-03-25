import React, { useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js'; // Importação da biblioteca para gerar PDF a partir do HTML
import { CopyToClipboard } from 'react-copy-to-clipboard'; // Importação do componente para copiar para a área de transferência
// import './Cep.css'; // Importação do arquivo CSS para estilização

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
          <h2>Dados do CEP</h2>
          <table className="cep-table">
            <tbody>
              <tr>
                <td><strong>CEP:</strong></td>
                <td>{cepData.cep}</td>
              </tr>
              <tr>
                <td><strong>Logradouro:</strong></td>
                <td>{cepData.logradouro}</td>
              </tr>
              <tr>
                <td><strong>Complemento:</strong></td>
                <td>{cepData.complemento}</td>
              </tr>
              <tr>
                <td><strong>Bairro:</strong></td>
                <td>{cepData.bairro}</td>
              </tr>
              <tr>
                <td><strong>Localidade:</strong></td>
                <td>{cepData.localidade}</td>
              </tr>
              <tr>
                <td><strong>UF:</strong></td>
                <td>{cepData.uf}</td>
              </tr>
              <tr>
                <td><strong>IBGE:</strong></td>
                <td>{cepData.ibge}</td>
              </tr>
              <tr>
                <td><strong>GIA:</strong></td>
                <td>{cepData.gia}</td>
              </tr>
              <tr>
                <td><strong>DDD:</strong></td>
                <td>{cepData.ddd}</td>
              </tr>
              <tr>
                <td><strong>SIAFI:</strong></td>
                <td>{cepData.siafi}</td>
              </tr>
            </tbody>
          </table>
          <div className="button-container">
            <button onClick={() => {
              const element = document.querySelector('.cep-data');
              html2pdf().from(element).save();
            }}>Gerar PDF</button>
            <CopyToClipboard text={JSON.stringify(cepData, null, 2)}>
              <button>Copiar</button>
            </CopyToClipboard>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cep;
