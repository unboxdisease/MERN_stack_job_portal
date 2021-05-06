import React, { Component } from "react";
import ls from "local-storage";
import axios from "axios";
// const Validator = require("validator");

class MyOrders extends Component {
	constructor() {
		super();
		this.state = {
			response: [],
			quantity: []
		};
	}
	// const response;
	componentDidMount() {
		const data = { email: ls.get("email") };
		axios
			.post("/searchresult/myapplications", data)
			.then(res => {
				this.setState({ response: res.data });
			})
			.catch(function(res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
		// console.log(len(this.state.response));
		// for (const obj of this.state.response) {
		// 	obj = 0;
		// }
	}
	onSubmit = arg => e => {
		e.preventDefault();
		const orderdata = {
			id:this.state.response[(arg-14)/9].jobid,
			rating :document.getElementById(arg-1).value
		};
		console.log(orderdata)
		axios
			.post("/job/rate", orderdata)
			.then(res => {
				console.log(res);
				alert("Thanks for rating the poor guy "+document.getElementById(arg-1).value);
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
			<td key={i++}>Job Title</td>,
			<td key={i++}>Salary</td>,
			<td key={i++}>date</td>,
			<td key={i++}>Recuiters Email</td>,
			<td key={i++}>Application Status</td>,
			<td key={i++}>Rate Job</td>,
			<td key={i++}>Rate</td>,
		];

		table.push(<tr key={i++}>{heading}</tr>);
		for (const response of this.state.response) {
			let children = [];
			const {
				title,
				salary,
				date,
				recruitermail,
				status,
				remaining
			} = response;

			children.push(
				<td id={i} key={i++}>
					{title}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{salary}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{date}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{recruitermail}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{status}
				</td>
			);
			children.push(
				<td  key={i++}>
				<input
						id={i - 1}
						style={{ width: 100 }}
						className="form-control mr-sm-2"
						type="number"
						min="1"
						max="5"
						placeholder="0 - 5"
						aria-label="Rating"
					></input>

				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{status === "Accepted" ? (
					<form onSubmit={this.onSubmit(i - 1)}>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							Rate
						</button>
					</form>
					) : null}
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
			<div>
				<table>
					<tbody>{table}</tbody>
				</table>
			</div>
		);
	}
}
export default MyOrders;
