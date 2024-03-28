import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentPage from "../components/Content/ContentPage";

const darkModeStyles = {
  backgroundColor: '#111',
  color: '#00ff00',
};

const UserPanel = ({ onBack }) => {
  const [userData, setUserData] = useState(null);
  const [editedPassword, setEditedPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://baserow.falacomigo.cloud/api/database/rows/table/4/?email=lussandro@gmail.com', {
          headers: {
            'Authorization': 'Token HBXrfcjuietdKV7SJrIs1Gv9aYGspybP',
          }
        });
        setUserData(response.data.results[0]); // Assuming we only want the first user found
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      await axios.patch(`https://baserow.falacomigo.cloud/api/database/rows/table/4/${userData.id}/`, {
        field_21: editedPassword,
      }, {
        headers: {
          'Authorization': 'Token HBXrfcjuietdKV7SJrIs1Gv9aYGspybP',
          'Content-Type': 'application/json',
        }
      });
      setIsEditing(false);
      alert('Senha atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar a senha:', error);
      alert('Erro ao salvar a senha. Por favor, tente novamente mais tarde.');
    }
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="user-panel" style={darkModeStyles}>
      {userData ? (
        <div>
          <h2>Dados do Usuário</h2>
          <p><strong>Nome:</strong> {userData.field_17}</p>
          <p><strong>Email:</strong> {userData.field_20}</p>
          {isEditing ? (
            <div>
              <label htmlFor="passwordInput">Nova Senha:</label>
              <input type="password" id="passwordInput" value={editedPassword} onChange={(e) => setEditedPassword(e.target.value)} />
            </div>
          ) : (
            <p><strong>Senha:</strong> {userData.field_21}</p>
          )}
          <p><strong>Data de Validade do Login:</strong> {userData.field_22}</p>
          <p><strong>Revenda:</strong> {userData.field_23}</p>
          <div>
            {isEditing ? (
              <button className="save-button" onClick={handleSave}>Salvar</button>
            ) : (
              <button className="edit-button" onClick={() => setIsEditing(true)}>Editar Senha</button>
            )}
            <button className="back-button" onClick={handleBack}>Voltar</button>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default UserPanel;
