import React, { useState } from 'react';
import axios from 'axios';

function Cpf() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [cpf, setCpf] = useState('');

  const handleInputChange = (event) => {
    setCpf(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://cpf.lussandro.com.br/api/consulta_cpf?cpf=${cpf}`);
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
        <div className="user-data">
          <h2><strong>Dados Básicos</strong></h2>
          <h3><p><strong>NOME:</strong> {userData.NOME}</p></h3>
          <p><strong>NASC:</strong> {userData.NASC}</p>
          <p><strong>SEXO:</strong> {userData.SEXO}</p>
          <p><strong>CPF:</strong> {userData.CPF}</p>
          <p><strong>RG:</strong> {userData.RG}</p>
          <p><strong>ORGAO_EMISSOR:</strong> {userData.ORGAO_EMISSOR}</p>
          <p><strong>UF EMISSAO:</strong> {userData.UF_EMISSAO}</p>
          <p><strong>TITULO ELEITOR:</strong> {userData.TITULO_ELEITOR}</p>
          <p><strong>CNS:</strong> {userData.cns}</p>
          <p><strong>NOME DA MAE:</strong> {userData.NOME_MAE}</p>
          <p><strong>NOME DO PAI:</strong> {userData.NOME_PAI}</p>
          <p><strong>ESTADO CIVIL:</strong> {userData.ESTCIV}</p>
          <p><strong>NACIONALIDE:</strong> {userData.NACIONALID}</p>
          <h2><strong>Telefones</strong></h2>
          <p><strong>TELEFONE:</strong> {userData.telefone}</p>
          <p><strong>TELEFONE2:</strong> {userData.telefone2}</p>
          <p><strong>TELEFONE3:</strong> {userData.telefone3}</p>
          <h2><strong>Endereço:</strong></h2>
          <p><strong>LOGRADOURO:</strong> {userData.enderecoLogr}</p>
          <p><strong>NUMERO:</strong> {userData.enderecoNu}</p>
          <p><strong>BAIRRO:</strong> {userData.enderecoBa}</p>
          <p><strong>CIDADE:</strong> {userData.enderecoMuni}</p>
          <p><strong>CEP:</strong> {userData.enderecoCe}</p>
          <h2><strong>Dados Sócio-econômicos:</strong></h2>
          <p><strong>OCUPACAO:</strong> {userData.OCUPACAO}</p>
          <p><strong>RENDA:</strong> {userData.RENDA}</p>
          <p><strong>MOSAICO NOVO - Segmento:</strong> {userData.MOSAICO_NOVO && userData.MOSAICO_NOVO.Segmento}</p>
          <p><strong>MOSAICO SECUNDARIO - Segmento:</strong> {userData.MOSAICO_SECUNDARIO && userData.MOSAICO_SECUNDARIO.Segmento}</p>
          
        </div>
      )}
    </div>
  );
}

export default Cpf;
