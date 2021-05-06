import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ls from "local-storage";
import Select from "react-select";
class Addjob extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			salary: "",
			no_of_applicants: "",
			recruitermail: "",
			deadline: "",
			job_type:"",
			duration:"",
			skillset:"",
			positions:"",
			selectedOption:"",
			errors: {}
		};
		this.job_type = [
			{ label: "Work From Home", value: "Work From Home" },
			{ label: "Half-Time", value: "Half-Time" },
			{label:"Full-Time",value:"Full-Time"}
		];
	}
	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};
	handleChange = selectedOption => {
		this.setState({ selectedOption });
		console.log(`Option selected:`, selectedOption);
	};

	onSubmit = e => {
		e.preventDefault();
		const newProduct = {
			title: this.state.title,
			salary: this.state.salary,
			no_of_applicants: this.state.no_of_applicants,
			recruitermail: ls.get("email"),
			deadline: this.state.deadline,
			job_type: this.state.selectedOption.value,
			duration: this.state.duration,
			skillset: this.state.skillset,
			positions: this.state.positions
		};
		console.log(newProduct);
		axios
			.post("job/create", newProduct)
			.then(function(res) {
				alert("Product Added Successfully");
				window.location.reload();
			})
			.catch(function(res) {
				alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	};

	render() {
		const { errors } = this.state;
		const { selectedOption } = this.state;
		return (
			<div className="container">
				<div className="row">
					<div className="col s8 offset-s2">
						<Link to="/" className="btn-flat waves-effect">
							<i className="material-icons left">
								keyboard_backspace
							</i>{" "}
							Back to home
						</Link>
						<div
							className="col s12"
							style={{ paddingLeft: "11.250px" }}
						>
							<h4>
								<b>Add Job</b>
							</h4>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.title}
									error={errors.title}
									id="title"
									type="text"
								/>
								<label htmlFor="title">title</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.salary}
									error={errors.salary}
									id="salary"
									type="number"
								/>
								<label htmlFor="salary">salary</label>
							</div>
							<div className="input-field col s6">
								<input
									onChange={this.onChange}
									value={this.state.no_of_applicants}
									error={errors.no_of_applicants}
									id="no_of_applicants"
									type="number"
								/>
								<label htmlFor="no_of_applicants">no. of applicants</label>
							</div>
							<div className="input-field col s6">
								<input
									onChange={this.onChange}
									value={this.positions}
									error={errors.positions}
									id="positions"
									type="number"
								/>
								<label htmlFor="positions">positions</label>
							</div>
							
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.deadline}
									error={errors.deadline}
									id="deadline"
									type="date"
								/>
								<label htmlFor="deadline">deadline</label>
							</div>
							<div className="input-field col s12">
							<Select
									id="job_type"
									placeholder="job type"
									value={selectedOption}
									onChange={this.handleChange}
									options={this.job_type}
								/>
								
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.duration}
									error={errors.duration}
									id="duration"
									type="number"
								/>
								<label htmlFor="duration">duration</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.skillset}
									error={errors.skillset}
									id="skillset"
									type="text"
								/>
								<label htmlFor="skillset">skillset</label>
							</div>
							
							<div
								className="col s12"
								style={{ paddingLeft: "11.250px" }}
							>
								<button
									style={{
										width: "150px",
										borderRadius: "3px",
										letterSpacing: "1.5px",
										marginTop: "1rem"
									}}
									type="submit"
									className="btn btn-large waves-effect waves-light hoverable blue accent-3"
								>
									Add Product
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Addjob;
