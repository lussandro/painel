import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js'; // Importação da biblioteca para gerar PDF a partir do HTML
import { CopyToClipboard } from 'react-copy-to-clipboard'; // Importação do componente para copiar para a área de transferência
import './Email.css'; // Importação do arquivo CSS para estilização

function Emails() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [cpf, setCpf] = useState('');

  const handleInputChange = (event) => {
    setCpf(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.lussandro.com.br/consulta/${cpf}`);
      const userData = response.data[0];
      setUserData(userData);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('E-mails não encontrados para este CPF!');
      setUserData(null);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className="container">
      <h1>Consulta E-mails por CPF</h1>
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
        <div className="table-container" id="user-table-container">
          <h2>Dados do Usuário</h2>
          <table className="user-table">
            <tbody>
              <tr>
                <td><strong>NOME:</strong></td>
                <td>{userData.NOME}</td>
              </tr>
              <tr>
                <td><strong>CPF:</strong></td>
                <td>{userData.CPF}</td>
              </tr>
              <tr>
                <td><strong>E-mails:</strong></td>
                <td>
                  <ul>
                    {userData.EMAILS.split(';').map((email, index) => (
                      <li key={index}>{email.trim()}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>NASCIMENTO:</strong></td>
                <td>{userData.NASC}</td>
              </tr>
              <tr>
                <td><strong>SEXO:</strong></td>
                <td>{userData.SEXO}</td>
              </tr>
              <tr>
                <td><strong>RG:</strong></td>
                <td>{userData.RG}</td>
              </tr>
              <tr>
                <td><strong>ÓRGÃO EMISSOR:</strong></td>
                <td>{userData.ORGAO_EMISSOR}</td>
              </tr>
              <tr>
                <td><strong>UF EMISSÃO:</strong></td>
                <td>{userData.UF}</td>
              </tr>
              <tr>
                <td><strong>TELEFONES:</strong></td>
                <td>
                  <ul>
                    {userData.TELEFONES.split(';').map((telefone, index) => (
                      <li key={index}>{telefone.trim()}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>ENDEREÇO:</strong></td>
                <td>{userData.ENDERECO}</td>
              </tr>
              <tr>
                <td><strong>BAIRRO:</strong></td>
                <td>{userData.BAIRRO}</td>
              </tr>
              <tr>
                <td><strong>CIDADE:</strong></td>
                <td>{userData.CIDADE}</td>
              </tr>
              <tr>
                <td><strong>CEP:</strong></td>
                <td>{userData.CEP}</td>
              </tr>
            </tbody>
          </table>
          <div className="button-container">
            <button onClick={() => {
              const element = document.getElementById('user-table-container');
              html2pdf().from(element).save();
            }}>Gerar PDF</button>
            <CopyToClipboard text={JSON.stringify(userData, null, 2)}>
              <button>Copiar</button>
            </CopyToClipboard>
          </div>
        </div>
      )}
    </div>
  );
}

export default Emails;
