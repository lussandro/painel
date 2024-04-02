import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js'; 
import { CopyToClipboard } from 'react-copy-to-clipboard'; 

function Telefones() {
  const [telefoneData, setTelefoneData] = useState(null);
  const [error, setError] = useState(null);
  const [ddd, setDdd] = useState('');
  const [telefone, setTelefone] = useState('');
  const [whatsappPicture, setWhatsappPicture] = useState('');

  useEffect(() => {
    if (telefoneData && telefoneData.picture) {
      setWhatsappPicture(telefoneData.picture);
    } else {
      setWhatsappPicture(null); // Reset the picture if API returns null
    }
  }, [telefoneData]);

  const handleDddChange = (event) => {
    setDdd(event.target.value);
  };

  const handleTelefoneChange = (event) => {
    setTelefone(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.local:5000/api/consulta_telefone?ddd=${ddd}&telefone=${telefone}`);
      setTelefoneData(response.data.data);
      setError(null);

      const whatsappResponse = await axios.post('https://api.chatcoreapi.io/chat/fetchProfile/teste', {
        number: `55${ddd}${telefone}`
      }, {
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'atc1wumavgo61zv8n6zmm'
        }
      });

      if (whatsappResponse.data && whatsappResponse.data.picture) {
        setWhatsappPicture(whatsappResponse.data.picture);
      } else {
        setWhatsappPicture(null); // Reset the picture if API returns null
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Erro ao buscar os dados: ${error.message}`);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleGeneratePDF = () => {
    const element = document.getElementById('telefone-data');
    html2pdf().from(element).save();
  };

  const handleCopyToClipboard = () => {
    const textToCopy = JSON.stringify(telefoneData);
    navigator.clipboard.writeText(textToCopy);
    alert('Dados copiados para a área de transferência!');
  };

  return (
    <div className="container">
      <h1>Consulta de Telefones</h1>
      <h7>Digite o DDD sem o zero</h7>
      <div className="search-container">
        <input
          type="text"
          value={ddd}
          onChange={handleDddChange}
          placeholder="DDD"
          className="search-input ddd-input"
        />
        <input
          type="text"
          value={telefone}
          onChange={handleTelefoneChange}
          placeholder="Telefone"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {telefoneData && (
        <div className="telefone-data" id="telefone-data">
          <table className="user-table">
            <h2><center>Dados Básicos</center></h2>
            <tbody>
              <tr>
                <td><strong>Foto Whatsapp:</strong></td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{whatsappPicture ? <img src={whatsappPicture} alt="Foto do WhatsApp" style={{ maxWidth: '30%', height: 'auto' }} /> : <span>Sem foto</span>}</td>
              </tr>
              <tr>
                <td><strong>DDD:</strong></td>
                <td> {telefoneData[0]}</td>
              </tr>
              <tr>
                <td><strong>Telefone:</strong></td>
                <td> {telefoneData[1]}</td>
              </tr>
              <tr>
                <td><strong>CPF/CNPJ:</strong></td>
                <td> {telefoneData[2]}</td>
              </tr>
              <tr>
                <td><strong>Nome:</strong> </td>
                <td>{telefoneData[3]}</td>
              </tr>
              <tr>
                <td><strong>Tipo:</strong> </td>
                <td>{telefoneData[4]}</td>
              </tr>
              <tr>
                <td><strong>Logradouro:</strong> </td>
                <td>{telefoneData[5]}</td>
              </tr>
              <tr>
                <td><strong>Número:</strong></td>
                <td>{telefoneData[6]}</td>
              </tr>
              <tr>
                <td><strong>Bairro:</strong></td>
                <td>{telefoneData[7]}</td>
              </tr>
              <tr>
                <td><strong>CEP:</strong> </td>
                <td>{telefoneData[8]}</td>
              </tr>
              <tr>
                <td><strong>Cidade:</strong></td>
                <td>{telefoneData[9]}</td>
              </tr>
              <tr>
                <td><strong>Estado:</strong></td>
                <td>{telefoneData[10]}</td>
              </tr>
            </tbody>
          </table>
          <div className="button-container">
            <button onClick={handleGeneratePDF} className="generate-pdf-button">
              Gerar PDF
            </button>
            <CopyToClipboard text={JSON.stringify(telefoneData)}>
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

export default Telefones;
