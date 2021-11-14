import { Container, Image, Nav, Navbar } from "react-bootstrap";

// import AccountIcon from "../../../../assets/Account.png";
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import Logo from "../../../../assets/logo.png";
import React from "react";
import { deepOrange } from '@mui/material/colors';
import styles from "./NavBar.module.css";

export const NavBar = () => {
	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			variant="dark"
			className={styles.NavBar}
		>
			<Navbar.Brand>
				<Link to="/" className={styles.navLinks}>
					<Image src={Logo} className={styles.logo}></Image>
				</Link>
			</Navbar.Brand>

			<Navbar.Toggle
				className={styles.responsiveNavbar}
				aria-controls="responsive-navbar-nav"
			/>
			
				<Navbar.Collapse id="responsive-navbar-nav">
				
					<Nav className={styles.nav}>
						<Link to="/" className={styles.navLinks}>
							Home
						</Link>
						<Link to="/SignUpPage" className={styles.navLinks}>
							<Avatar sx={{ bgcolor: "aliceblue" ,width:28,height:29,color:"black" }} variant="square">N</Avatar>
						</Link>
						
					</Nav>
				</Navbar.Collapse>
			
		</Navbar>
	);
};
