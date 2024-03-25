import React from 'react';
import ContentPage from "../components/Content/ContentPage";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <ContentPage titulo="Consultas Disponíveis" caminho={[{nome: "Dashboard", link: "/"}]}>
            <div className="button-container">
                <Link to="/cpf" className="large-button">
                    <img src="/images/cpf.png" alt="cpf" />
                    <p>Findy CPF</p>
                </Link>
                <Link to="/email" className="large-button">
                    <img src="/images/email.png" alt="Email" />
                   <p>Findy e-mail</p>
                </Link>
                <Link to="/placas" className="large-button">
                    <img src="/images/placa.png" alt="Placas" />
                    <p>Findy Veículos</p>
                </Link>
                <Link to="/cns" className="large-button">
                    <img src="/images/cns.png" alt="CNS" />
                    <p>Findy CNS</p>
                </Link>
            </div>
            <div className="button-container">
                <Link to="/tituloeleitor" className="large-button">
                    <img src="/images/titulo.jpeg" alt="Titulo de Eleitor" />
                    <p>Findy Tit. Eleitor</p>
                </Link>
                <Link to="/nome" className="large-button">
                    <img src="/images/nome.png" alt="Nome" />
                    <p>Findy Nome</p>
                </Link>
                <Link to="/cep" className="large-button">
                    <img src="/images/cep.jpg" alt="CEP" />
                    <p>Findy CEP</p>
                </Link>
                <Link to="/cnpj" className="large-button">
                    <img src="/images/cnpj.jpg" alt="CNPJ" />
                    <p>Findy CNPJ</p>
                </Link>
            </div>
            <div className="button-container">
                <Link to="/rg" className="large-button">
                    <img src="/images/rg.jpg" alt="RG" />
                    <p>Findy RG</p>
                </Link>
                <Link to="/cnh" className="large-button">
                    <img src="/images/cnh.jpg" alt="Habilitação" />
                    <p>Findy Habilitação</p>
                </Link>
                <Link to="/telefone" className="large-button">
                    <img src="/images/telefone.png" alt="telefone" />
                    <p>Findy Telefone</p>
                </Link>
            </div>
        </ContentPage>
    );
};

export default Home;
