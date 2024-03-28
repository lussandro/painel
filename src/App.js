import { BrowserRouter, Routes, Route } from "react-router-dom"
import Menu from "./components/Menu/Menu";
import Home from "./pages/Home"
import Cpf from "./pages/Cpf";
import Placas from "./pages/Placas";
import Cnpj from "./pages/Cnpj";
import Telefones from "./pages/Telefones";
import Cep from "./pages/Cep";
import Cns from "./pages/Cns";
import Emails from "./pages/Email";
import UserPanel from "./pages/UserPanel";
import CpfConsulta from "./pages/CpfConsulta";
import ConsultaPlaca from "./pages/ConsultaPlaca";


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Menu>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cpf" element={<Cpf />} />
            <Route path="/placas" element={<Placas />} />
            <Route path="/veiculos" element={<ConsultaPlaca />} />                        
            <Route path="/cnpj" element={<Cnpj />} />     
            <Route path="/telefone" element={<Telefones />} /> 
            <Route path="/cep" element={<Cep />} />        
            <Route path="/cns" element={<Cns />} />                    
            <Route path="/email" element={<Emails />} />                 
            <Route path="/user" element={<UserPanel />} />  
            <Route path="/sniper" element={<CpfConsulta />} />                
          </Routes>
        </Menu>
      </BrowserRouter>
    </div>
  );
}

export default App;
