import { BrowserRouter, Routes, Route } from "react-router-dom"
import Menu from "./components/Menu/Menu";
import Home from "./pages/Home"
import Cpf from "./pages/Cpf";
import Placas from "./pages/Placas";
import Cnpj from "./pages/Cnpj";
import Telefones from "./pages/Telefones";
import Cep from "./pages/Cep";
import Cns from "./pages/Cns";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Menu>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cpf" element={<Cpf />} />
            <Route path="/placas" element={<Placas />} />            
            <Route path="/cnpj" element={<Cnpj />} />     
            <Route path="/telefone" element={<Telefones />} /> 
            <Route path="/cep" element={<Cep />} />        
            <Route path="/cns" element={<Cns />} />                    
          </Routes>
        </Menu>
      </BrowserRouter>
    </div>
  );
}

export default App;
