import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";




export default function NavBar() {

    return (
        <Menu inverted fixed='top' id='NavBar'>

            <Container>

                <MenuItem as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities
                </MenuItem>

                <MenuItem as={NavLink} to='/activities' name='Activities' />
                <MenuItem as={NavLink} to='/errors' name='Errors' />

                <MenuItem>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                </MenuItem>

            </Container>

        </Menu>
    )
}