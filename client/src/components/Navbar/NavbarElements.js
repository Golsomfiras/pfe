import { NavLink as Link } from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
import styled from 'styled-components'


export const Nav = styled.nav`
  background: #393F4B;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  
  &.active {
    color: #f59645;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  // @media screen and (max-width: 768px) {
  //   display: block;
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   transform: translate(-100%, 75%);
  //   font-size: 1.8rem;
  //   cursor: pointer;
  // }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  margin-right: 24px; 
  // @media screen and (max-width: 768px) {
  //   display: none;
  // }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #2DD9BC;
  padding: 10px 22px;
  color: #393F4B;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #f59645;
    color: #010606;
  }
`;

