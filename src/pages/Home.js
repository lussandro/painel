import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faEnvelope, faCar, faIdCard, faIdBadge, faUser, faMapMarkerAlt, faBuilding, faIdCardAlt, faAddressBook, faPhone } from '@fortawesome/free-solid-svg-icons';
import ContentPage from "../components/Content/ContentPage";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="matrix-container">
            {/* <h1 className="matrix-title">Consultas Disponíveis</h1> */}
            <ContentPage titulo="" caminho={[{nome: "Dashboard", link: "/"}]}>
                <div className="matrix-content">
                    <Link to="/cpf" className="matrix-link">
                        <FontAwesomeIcon icon={faAddressCard} size="3x" />
                        <p>Findy CPF</p>
                        <h12>Busca dados por CPF</h12>
                    </Link>
                    <Link to="/cpf" className="matrix-link">
                        <FontAwesomeIcon icon={faEnvelope} size="3x" />
                        <p>Findy e-mail</p>
                        <h12>Busca emails por CPF</h12>
                    </Link>
                    <Link to="/placas" className="matrix-link">
                        <FontAwesomeIcon icon={faCar} size="3x" />
                        <p>Findy Veículos</p>
                        <h12>Dados do Veiculo pela PLACA</h12>
                    </Link>
                    <Link to="/cns" className="matrix-link">
                        <FontAwesomeIcon icon={faIdCard} size="3x" />
                        <p>Findy CNS</p>
                        <h12>Busca dados pelo CNS/NIS</h12>
                    </Link>
                    <Link to="/tituloeleitor" className="matrix-link">
                        <FontAwesomeIcon icon={faIdBadge} size="3x" />
                        <p>Findy Tit. Eleitor</p>
                        <h12>Busca dados por Titulo de Eleitor</h12>
                    </Link>
                    <Link to="/nome" className="matrix-link">
                        <FontAwesomeIcon icon={faUser} size="3x" />
                        <p>Findy Nome</p>
                        <h12>Busca dados pelo Nome</h12>
                    </Link>
                    <Link to="/cep" className="matrix-link">
                        <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" />
                        <p>Findy CEP</p>
                        <h12>Endereço pelo CEP</h12>
                    </Link>
                    <Link to="/cpf_comp" className="matrix-link">
                        <FontAwesomeIcon icon={faAddressCard} size="3x" />
                        <p>Findy Completo</p>
                        <h12>Busca todos os dados pelo CPF</h12>
                    </Link>
                    <Link to="/cnpj" className="matrix-link">
                        <FontAwesomeIcon icon={faBuilding} size="3x" />
                        <p>Findy CNPJ</p>
                        <h12>Dados da empresa pelo CNPJ</h12>
                    </Link>
                    <Link to="/rg" className="matrix-link">
                        <FontAwesomeIcon icon={faIdCardAlt} size="3x" />
                        <p>Findy RG</p>
                        <h12>Busca dados pelo RG</h12>
                    </Link>
                    <Link to="/cnh" className="matrix-link">
                        <FontAwesomeIcon icon={faAddressBook} size="3x" />
                        <p>Findy Habilitação</p>
                        <h12>Busca dados pela CNH</h12>
                    </Link>
                    <Link to="/veiculos" className="matrix-link">
                        <FontAwesomeIcon icon={faCar} size="3x" />
                        <p>Findy Veiculos Full</p>
                        <h12>Veiculos Completa, com dados do condutor e multas</h12>
                    </Link>
                    <Link to="/telefone" className="matrix-link">
                        <FontAwesomeIcon icon={faPhone} size="3x" />
                        <p>Findy Celular</p>
                        <h12>Busca dados pelo celular</h12>
                    </Link>
                    <Link to="/nome" className="matrix-link">
                        <FontAwesomeIcon icon={faUser} size="3x" />
                        <p>Findy Nome da Mãe</p>
                        <h12>Busca dados pelo Nome da Mãe</h12>
                    </Link>
                </div>
            </ContentPage>
        </div>
    );
};

export default Home;
