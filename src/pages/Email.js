import React, { useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './Email.css';

function Emails() {
  const [contactData, setContactData] = useState([]);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.desemrolabrasil.org/buscar_contatos?email=${email}`);
      setContactData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Nenhum contato encontrado para este e-mail!');
      setContactData([]);
    }
  };

  return (
    <div className="container">
      <h1>Consulta de Nomes e CPFs por E-mail</h1>
      <div className="search-container">
        <input
          type="text"
          value={email}
          onChange={handleInputChange}
          placeholder="Digite o E-mail"
          className="search-input"
        />
        <button onClick={fetchData} className="search-button">
          Buscar
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {contactData.length > 0 && (
        <div className="table-container" id="contact-table-container">
          <h2>Contatos Encontrados</h2>
          <table className="contact-table">
            <tbody>
            {contactData.map((contact, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td><strong>Nome:</strong></td>
                  <td>{contact.nome}</td>
                </tr>
                <tr>
                  <td><strong>CPF:</strong></td>
                  <td>{contact.cpf}</td>
                </tr>
              </React.Fragment>
            ))}

            </tbody>
          </table>
          <div className="button-container">
            <button onClick={() => {
              const element = document.getElementById('contact-table-container');
              html2pdf().from(element).save();
            }}>Gerar PDF</button>
            <CopyToClipboard text={JSON.stringify(contactData, null, 2)}>
              <button>Copiar</button>
            </CopyToClipboard>
          </div>
        </div>
      )}
    </div>
  );
}

export default Emails;
