import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<div>
			<Navbar bg='dark' variant='dark'>
				<Container>
					<Nav className='me-auto'>
						<Nav.Link as={NavLink} to='/home'>
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to='/createpost'>
							Create Post
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</div>
	);
};

export default Header;
