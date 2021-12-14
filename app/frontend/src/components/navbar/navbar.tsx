import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {FC} from "react";
import './navbar.scss';
import {NavBarProps} from "../../entitites/navbar/navbar.interfaces";

const NavBar: FC<NavBarProps> = props => {
    return (
        <Navbar bg='dark' variant='dark' fixed='top'>
            <Navbar.Brand as={Link} to='/'>React TO</Navbar.Brand>
            <Nav>
                <Nav.Item>
                    <Nav.Link className={props.activePage === 'active-queue' ? 'active' : ''} as={Link} to='/active-queue' eventKey='1'>Текущая очередь</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={props.activePage === 'passed' ? 'active' : ''} as={Link} to='/passed' eventKey='2'>Прошедшие ТО</Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
}

export default NavBar;