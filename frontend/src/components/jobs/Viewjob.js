import React, { Component } from "react";
import axios from "axios";
import ls from "local-storage";
import { Link } from 'react-router-dom'

class Viewjob extends Component {
	constructor() {
		super();
		this.state = {
			response: []
		};
	}
	// const response;
	componentDidMount() {
		const data = { mail: ls.get("email") };
		axios
			.post("job/view", data)
			.then(res => {
				this.setState({ response: res.data });
			})
			.catch(function(res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	}

	onSubmit = arg => e => {
		e.preventDefault();
		const orderdata = {
			name: document.getElementById(arg - 4).innerHTML,
			mail: ls.get("email")
		};
		console.log(orderdata);
		axios
			.post("/job/cancel", orderdata)
			.then(res => {
				console.log(res);
				alert("job deleted Successfuly");
				window.location.reload();
			})
			.catch(function(res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	};

	

	createTable() {
		let table = [];
		let i = 0;
		let heading = [
			<td key={i++}>Title</td>,
			<td key={i++}>Date</td>,
			<td key={i++}>No. of applicants</td>,
			<td key={i++}>positions</td>,
			<td key={i++}>Delete</td>,
			<td key={i++}>Edit</td>,
			

		];
		table.push(<tr key={i++}>{heading}</tr>);
		for (const response of this.state.response) {
			let children = [];
			const { title, date, no_of_applicants,positions ,_id} = response;

			children.push(
				<td id={i} key={i++}>
					<Link to={{ pathname: '/applications', state: { id: _id} }}>{title} </Link>
					
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{date}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{no_of_applicants}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{positions}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					<form onSubmit={this.onSubmit(i - 1)}>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							Cancel
						</button>
					</form>
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					<Link to={{ pathname: '/editjob', state: { id: _id} }}>
					<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							Edit
						</button>
						</Link>
					
				</td>
			);
			
			table.push(<tr key={i++}>{children}</tr>);
			i++;
		}
		return table;
	}

	render() {
		const table = this.createTable();
		return (
			<table>
				<tbody>{table}</tbody>
			</table>
		);
	}
}

export default Viewjob;
