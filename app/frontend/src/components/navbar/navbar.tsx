import {Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import React, {FC} from 'react';
import './navbar.scss';
import {NavBarProps} from '../../entitites/navbar/navbar.interfaces';

const NavBar: FC<NavBarProps> = props => {
    return (
        <Navbar bg='dark' variant='dark' fixed='top'>
            <Navbar.Brand as={Link} to='/'>React TO</Navbar.Brand>
            <Nav>
                <Nav.Item>
                    <Nav.Link className={props.activePage === 'active-records' ? 'active' : ''} as={Link} to='/active-records' eventKey='1'>Активные записи</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={props.activePage === 'passed-records' ? 'active' : ''} as={Link} to='/passed-records' eventKey='2'>Прошедшие ТО</Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
}

export default NavBar;