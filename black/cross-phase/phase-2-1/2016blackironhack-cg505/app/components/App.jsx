import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import Counter from './Counter';

export default class App extends Component {
	render() {
		return (
			<div id="content">
				<Navbar fixedTop>
					<Navbar.Header>
						<Navbar.Brand>
							Vektorv
						</Navbar.Brand>
					</Navbar.Header>
				</Navbar>
				<div className="container">
					<Counter />
				</div>
			</div>
		);
	}
}
