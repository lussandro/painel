import React, { useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js'; // Importe a biblioteca para gerar PDF
import { CopyToClipboard } from 'react-copy-to-clipboard'; // Importe a biblioteca para copiar para a área de transferência

function Cpf() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [cpf, setCpf] = useState('');

  const handleInputChange = (event) => {
    setCpf(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/consulta_cpf?cpf=${cpf}`);
      setUserData(response.data.complete_data); // Accessing complete_data from response
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('CPF Não encontrado! ');
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

  const handleGeneratePDF = () => {
    // Lógica para gerar o PDF com os dados
    const element = document.getElementById('cpf-data');
    html2pdf().from(element).save();
  };

  const handleCopyToClipboard = () => {
    // Lógica para copiar os dados para a área de transferência
    const textToCopy = JSON.stringify(userData); // Convertendo os dados em formato JSON
    navigator.clipboard.writeText(textToCopy);
    alert('Dados copiados para a área de transferência!');
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
      {error && <p className="error">{error}</p>}
      {userData && (
        <div className="user-data" id="cpf-data">
          <h2>Dados Básicos</h2>
          <table>
            <tbody>
              <tr>
                <td><strong>NOME:</strong></td>
                <td>{userData.NOME}</td>
              </tr>
              <tr>
                <td><strong>NASC:</strong></td>
                <td>{formatDate(userData.NASC)}</td>
              </tr>
              <tr>
                <td><strong>SEXO:</strong></td>
                <td>{userData.SEXO}</td>
              </tr>
              <tr>
                <td><strong>CPF:</strong></td>
                <td>{userData.CPF}</td>
              </tr>
              <tr>
                <td><strong>RG:</strong></td>
                <td>{userData.RG}</td>
              </tr>
              <tr>
                <td><strong>ORGAO_EMISSOR:</strong></td>
                <td>{userData.ORGAO_EMISSOR}</td>
              </tr>
              <tr>
                <td><strong>UF EMISSAO:</strong></td>
                <td>{userData.UF_EMISSAO}</td>
              </tr>
              <tr>
                <td><strong>TITULO ELEITOR:</strong></td>
                <td>{userData.TITULO_ELEITOR}</td>
              </tr>
              <tr>
                <td><strong>CNS:</strong></td>
                <td>{userData.cns}</td>
              </tr>
              <tr>
                <td><strong>NOME DA MAE:</strong></td>
                <td>{userData.NOME_MAE}</td>
              </tr>
              <tr>
                <td><strong>NOME DO PAI:</strong></td>
                <td>{userData.NOME_PAI}</td>
              </tr>
              <tr>
                <td><strong>ESTADO CIVIL:</strong></td>
                <td>{userData.ESTCIV}</td>
              </tr>
              <tr>
                <td><strong>NACIONALIDE:</strong></td>
                <td>{userData.NACIONALID}</td>
              </tr>
            </tbody>
          </table>

          <h2>Telefones</h2>
          <table>
            <tbody>
              <tr>
                <td><strong>TELEFONE:</strong></td>
                <td>{userData.telefone}</td>
              </tr>
              <tr>
                <td><strong>TELEFONE2:</strong></td>
                <td>{userData.telefone2}</td>
              </tr>
              <tr>
                <td><strong>TELEFONE3:</strong></td>
                <td>{userData.telefone3}</td>
              </tr>
            </tbody>
          </table>

          <h2>Endereço</h2>
          <table>
            <tbody>
              <tr>
                <td><strong>LOGRADOURO:</strong></td>
                <td>{userData.enderecoLogr}</td>
              </tr>
              <tr>
                <td><strong>NUMERO:</strong></td>
                <td>{userData.enderecoNu}</td>
              </tr>
              <tr>
                <td><strong>BAIRRO:</strong></td>
                <td>{userData.enderecoBa}</td>
              </tr>
              <tr>
                <td><strong>CIDADE:</strong></td>
                <td>{userData.enderecoMuni}</td>
              </tr>
              <tr>
                <td><strong>CEP:</strong></td>
                <td>{userData.enderecoCe}</td>
              </tr>
            </tbody>
          </table>

          <h2>Dados Sócio-econômicos</h2>
          <table>
            <tbody>
              <tr>
                <td><strong>OCUPACAO:</strong></td>
                <td>{userData.OCUPACAO}</td>
              </tr>
              <tr>
                <td><strong>RENDA:</strong></td>
                <td>{userData.RENDA}</td>
              </tr>
              <tr>
                <td><strong>MOSAICO NOVO - Segmento:</strong></td>
                <td>{userData.MOSAICO_NOVO && userData.MOSAICO_NOVO.Segmento}</td>
              </tr>
              <tr>
                <td><strong>MOSAICO SECUNDARIO - Segmento:</strong></td>
                <td>{userData.MOSAICO_SECUNDARIO && userData.MOSAICO_SECUNDARIO.Segmento}</td>
              </tr>
            </tbody>
          </table>

          {/* Botões para gerar PDF e copiar */}
          <div className="button-container">
            <button onClick={handleGeneratePDF} className="generate-pdf-button">
            Gerar PDF
            </button>
            <CopyToClipboard text={JSON.stringify(userData)}>
              <button className="copy-to-clipboard-button" onClick={handleCopyToClipboard}>
                Copiar Dados
              </button>
            </CopyToClipboard>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cpf;
