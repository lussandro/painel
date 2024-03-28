import { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Nabar/Navbar";
import ItemMenu from "./ItemMenu";
import "./Menu.style.css";

const Menu = ({ children }) => {

    const [open, setOpen] = useState('aberto');

    const handleMenu = () => {
        (open === 'aberto') ? setOpen('fechado') : setOpen('aberto');
    };

    return (
        <>
            <div className={`menu ${open}`}>
                <h1 className="logo">Findy</h1>
                <hr className="divisor" />

                <ul className="conteudo-menu">
                    {/* Menu sem Dropdow */}
                    <li className="item-menu">
                        <NavLink className="link-menu" to="/">
                            <i class="fa fa-search"></i>
                            <span>Consultas</span>
                        </NavLink>
                    </li>

                    
                    <li className="item-menu">
                        <NavLink className="link-menu" to="/user">
                            <i class="fa fa-user-circle-o"></i>
                            <span>Minha Conta</span>
                        </NavLink>
                    </li>
                    <li className="item-menu">
                        <NavLink className="link-menu" to="/">
                            <i class="fa-solid fa-diagram-project"></i> 
                            <span>API</span>
                        </NavLink>
                    </li>
                    <li className="item-menu">
                        <NavLink className="link-menu" to="/">
                            <i class="fa fa-sign-out"></i>  
                            <span>Logout</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className={`site ${open}`}>
                <Navbar
                    tipoMenu={open}
                    handleMenu={handleMenu}
                />

                {children}
            </div>
        </>
    );
};

export default Menu;