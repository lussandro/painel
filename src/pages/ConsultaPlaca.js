import React, { useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function ConsultaPlaca() {
  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState(null);
  const [placa, setPlaca] = useState('');

  const handleInputChange = (event) => {
    setPlaca(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://65.21.240.99:3000/veiculo/${placa}`);
      setVehicleData(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Placa de veículo não encontrada!');
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleGeneratePDF = () => {
    const element = document.getElementById('vehicle-data');
    html2pdf().from(element).save();
  };

  const handleCopyToClipboard = () => {
    const textToCopy = JSON.stringify(vehicleData);
    navigator.clipboard.writeText(textToCopy);
    alert('Dados copiados para a área de transferência!');
  };

  return (
    <div className="container">
      <h1>Consulta de Placa de Veículo</h1>
      <div className="search-container">
        <input
          type="text"
          value={placa}
          onChange={handleInputChange}
          placeholder="Digite a placa do veículo"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {vehicleData && (
        <div className="vehicle-data" id="vehicle-data">
          <h2>Dados do Veículo</h2>
          <table>
            <tbody>
              {Object.entries(vehicleData).map(([key, value]) => (
                <tr key={key}>
                  <td><strong>{key}:</strong></td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Botões para gerar PDF e copiar */}
          <div className="button-container">
            <button onClick={handleGeneratePDF} className="generate-pdf-button">
              Gerar PDF
            </button>
            <CopyToClipboard text={JSON.stringify(vehicleData)}>
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

export default ConsultaPlaca;
