import React, { useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './Cep.css'; 


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
      setEmpresaData(response.data);
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
          <h2>Dados da Empresa</h2>
          <table className="empresa-table">
            <tbody>
              <tr>
                <td><strong>CNPJ:</strong></td>
                <td>{empresaData.cnpj}</td>
              </tr>
              <tr>
                <td><strong>Razão Social:</strong></td>
                <td>{empresaData.razao_social}</td>
              </tr>
              <tr>
                <td><strong>Nome Fantasia:</strong></td>
                <td>{empresaData.nome_fantasia}</td>
              </tr>
              <tr>
                <td><strong>CEP:</strong></td>
                <td>{empresaData.cep}</td>
              </tr>
              <tr>
                <td><strong>Logradouro:</strong></td>
                <td>{empresaData.logradouro}</td>
              </tr>
              <tr>
                <td><strong>Número:</strong></td>
                <td>{empresaData.numero}</td>
              </tr>
              <tr>
                <td><strong>Bairro:</strong></td>
                <td>{empresaData.bairro}</td>
              </tr>
              <tr>
                <td><strong>Município:</strong></td>
                <td>{empresaData.municipio}</td>
              </tr>
              <tr>
                <td><strong>UF:</strong></td>
                <td>{empresaData.uf}</td>
              </tr>
              <tr>
                <td><strong>Porte:</strong></td>
                <td>{empresaData.porte}</td>
              </tr>
              <tr>
                <td><strong>Natureza Jurídica:</strong></td>
                <td>{empresaData.natureza_juridica}</td>
              </tr>
              <tr>
                <td><strong>Situação Cadastral:</strong></td>
                <td>{empresaData.descricao_situacao_cadastral}</td>
              </tr>
              <tr>
                <td><strong>Capital Social:</strong></td>
                <td>{empresaData.capital_social}</td>
              </tr>
            </tbody>
          </table>
          <div className="button-container">
            <button onClick={() => {
              const element = document.querySelector('.empresa-data');
              html2pdf().from(element).save();
            }}>Gerar PDF</button>
            <CopyToClipboard text={JSON.stringify(empresaData, null, 2)}>
              <button>Copiar</button>
            </CopyToClipboard>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cnpj;
