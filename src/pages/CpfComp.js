import React, { useState } from 'react';
import axios from 'axios';

function CpfComp() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [cpf, setCpf] = useState('');

  const handleInputChange = (event) => {
    setCpf(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.desemrolabrasil.org/cpf/${cpf}`);
      setUserData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Erro ao buscar dados do CPF');
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className="container">
      <h1>Consulta de CPF</h1>
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
          <h2>Dados Básicos</h2>
          <table>
            <tbody>
              <tr>
                <td><strong>NOME:</strong></td>
                <td>{userData.NOME}</td>
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
                <td><strong>CPF:</strong></td>
                <td>{userData.CPF}</td>
              </tr>
              <tr>
                <td><strong>RG:</strong></td>
                <td>{userData.RG}</td>
              </tr>
              <tr>
                <td><strong>ORGAO EMISSOR:</strong></td>
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
                <td>{userData.CNS}</td>
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
                <td><strong>NACIONALIDADE:</strong></td>
                <td>{userData.NACIONALID}</td>
              </tr>
            </tbody>
          </table>

          <h2>Endereços</h2>
          <table>
            <tbody>
              {userData.enderecos.map((endereco, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td><strong>LOGRADOURO:</strong></td>
                    <td>{endereco.LOGRADOURO}</td>
                  </tr>
                  <tr>
                    <td><strong>NUMERO:</strong></td>
                    <td>{endereco.NUMERO}</td>
                  </tr>
                  <tr>
                    <td><strong>BAIRRO:</strong></td>
                    <td>{endereco.BAIRRO}</td>
                  </tr>
                  <tr>
                    <td><strong>CIDADE:</strong></td>
                    <td>{endereco.CIDADE}</td>
                  </tr>
                  <tr>
                    <td><strong>CEP:</strong></td>
                    <td>{endereco.CEP}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <h2>Parentes</h2>
          <table>
            <tbody>
              {userData.irmaos.map((irmao, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td><strong>Nome:</strong></td>
                    <td>{irmao.nome}</td>
                  </tr>
                  <tr>
                    <td><strong>CPF:</strong></td>
                    <td>{irmao.cpf}</td>
                  </tr>
                  <tr>
                    <td><strong>Data de Nascimento:</strong></td>
                    <td>{irmao.nasc}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          
          <h2>Telefones</h2>
          <table>
            <tbody>
              {userData.telefones.map((telefone, index) => (
                <tr key={index}>
                  <td><strong>TELEFONE:</strong></td>
                  <td>({telefone.DDD}) {telefone.NUMERO}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CpfComp;
