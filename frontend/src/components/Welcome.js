import React, { Component } from "react";
import ls from "local-storage";
import axios from "axios";

class Welcome extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			contact: "",
			bio: "",
			usertype: "",
			skills:"",
			education:"",
			startyear:"",
			rating:"",
			ratecount:""
		};
	}
	componentDidMount() {
		const data = { email: ls.get("email") };

		axios
			.post("/", data)
			.then(res => {
				this.setState({
					name: res.data[0].name,
					email: res.data[0].email,
					contact: res.data[0].contact,
					bio: res.data[0].bio,
					usertype: res.data[0].usertype,
					skills:res.data[0].skills,
					education:res.data[0].education,
					startyear:res.data[0].startyear,
					rating:res.data[0].rating,
					ratecount:res.data[0].ratecount,
					image:res.data[0].image
				});
				console.log(res.data)
			})
			.catch(function (res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});

	}
	render() {
		console.log()
		let imageData = this.state.image;

			if (Array.isArray(imageData))
				imageData = imageData.map(x => String.fromCharCode(x)).join("");

		return (
			<div>
				<center>
					
						<h4>{this.state.usertype} Account</h4>
					
						<img src={imageData} />
					<div className="col s12" style={{ paddingLeft: "11.250px" }}>
						<h2>
							<b>Hello {this.state.name}</b>
						</h2>
					</div>
					<br></br>
					{ls.get("usertype") === "Recruiter" ? (
						<h4>Contact Number: {this.state.contact}</h4>
					) : null}
					{ls.get("usertype") === "Recruiter" ? (
						<p>bio: {this.state.bio}</p>
					) : null}
					{ls.get("usertype") === "Applicant" ? (
						<h4>Rating: {(this.state.rating/ this.state.ratecount).toFixed(2) === "NaN"
						? 0
						: (this.state.rating/ this.state.ratecount).toFixed(2)}</h4>
					) : null}
					{ls.get("usertype") === "Applicant" ? (
						<h4>Education: {this.state.education}</h4>
					) : null}
					{ls.get("usertype") === "Applicant" ? (
						<p>Start Year: {this.state.startyear}</p>
					) : null}
					{ls.get("usertype") === "Applicant" ? (
						<p>skills: {this.state.skills}</p>
					) : null}
				</center>
			</div>

		)
	}
}
export default Welcome;
