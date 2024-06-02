import logo from "../../images/technixicon.png";
import {Nav, NavLink, Bars, NavMenu, NavBtnLink} from './NavbarElements';
import admin_logo from '../../images/icon-admin.png'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const Navbar = () => {
  const history = useHistory();

  function Logout(){
    axios.get('/api/logout')
            .then(result => {
                console.log(result);
                if (result.data ==="LOGOUT") {
                  history.push("/")
                } else  {
                  console.log("nothing")
                }
            })
            .catch(err => console.log(err));

  }

  return (
    <div className="navbar">
      <Nav>
        <NavLink to='/profile'>
          <div className="admin-container-title-and-logo">
             <NavLink to="/profile" activeStyle={{color:"#f59645"}}>Change password</NavLink>
            <img src={admin_logo} alt="Technix-Technology logo" className="admin-logo" />
          </div>
        </NavLink>
        <Bars />
        <NavMenu>
          {/* <NavLink to='/' activeStyle>Home</NavLink> */}
          <NavLink to='/create-new' activeStyle={{color:"#f59645"}}>New Survey</NavLink>
          <NavLink to='/existing-surveys' activeStyle={{color:"#f59645"}}>Existing Surveys</NavLink>
          <NavLink to='/data-analysis' activeStyle={{color:"#f59645"}}>Data Analysis</NavLink>
          <NavBtnLink to='/' onClick={Logout}>Logout</NavBtnLink>
        </NavMenu>
      </Nav>
      </div>
  );
};

export default Navbar;