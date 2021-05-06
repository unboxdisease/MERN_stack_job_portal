import React, { Component } from "react";
import axios from "axios";
import ls from "local-storage";

class ProfileApplicant extends Component {
	constructor() {
		super();
		this.state = {
			
			startyear:"",
			name:"",
            education:"",
			skills:"",
			image:"",
			cv:"",
			errors: {}
		};
	}
	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};
	onChangeim = e => {
		const fr = new FileReader();
		fr.onload = function() {
			this.setState({ image: fr.result });
		}.bind(this);
		fr.readAsDataURL(e.target.files[0]);
	};
	onChangecv = e => {
		const fr = new FileReader();
		fr.onload = function() {
			this.setState({ cv: fr.result });
		}.bind(this);
		fr.readAsDataURL(e.target.files[0]);
	};


	onSubmit = e => {
		e.preventDefault();
		const newProfile = {
			_id:ls.get("id"),
			name:this.state.name,
			education:this.state.education,
            skills:this.state.skills,
			startyear:this.state.startyear,
			image:this.state.image
		};
		console.log(newProfile);
		axios
			.post("users/update2", newProfile)
			.then(res => {
				alert("done");	
				window.location.reload();
				console.log("hi")
				ls.set("username", res.data.user.name);
				
				
			})
			.catch(function(res) {
				alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	};
	render() {
		const { errors } = this.state;
		return (
			<div className="container">
				<div className="row">
					<div className="col s8 offset-s2">
						<div
							className="col s12"
							style={{ paddingLeft: "11.250px" }}
						>
							<h4>
								<b>Edit Profile</b>
							</h4>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.name}
									error={errors.name}
									id="name"
									type="text"
								/>
								<label htmlFor="name">name</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.skills}
									error={errors.skills}
									id="skills"
									type="text"
								/>
								<label htmlFor="skills">skills</label>
							</div>
							
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.education}
									error={errors.education}
									id="education"
									type="text"
									maxLength="250"
								/>
								<label htmlFor="education">education</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.startyear}
									error={errors.startyear}
									id="startyear"
									type="number"
								/>
								<label htmlFor="startyear">startyear</label>
							</div>
							<div className="input-field col s12">
								<label for="image">Select Profile Image:</label>
								<br></br>
								<br></br>
								<input
									type="file"
									onChange={this.onChangeim}
									// value={this.state.image}
									id="image"
									name="image"
								></input>
								</div>
								<div className="input-field col s12">
								<label for="cv">Select CV pdf:</label>
								<br></br>
								<br></br>
								<input
									type="file"
									onChange={this.onChangecv}
									// value={this.state.image}
									id="cv"
									name="cv"
								></input>
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
									Edit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}


export default ProfileApplicant;
