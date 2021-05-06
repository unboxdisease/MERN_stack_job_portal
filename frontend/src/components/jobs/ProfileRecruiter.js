import React, { Component } from "react";
import axios from "axios";
import ls from "local-storage";

class ProfileRecruiter extends Component {
	constructor() {
		super();
		this.state = {
			
			bio:"",
			name:"",
			contact:"",
			errors: {}
		};
	}
	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};


	onSubmit = e => {
		e.preventDefault();
		const newProfile = {
			_id:ls.get("id"),
			name:this.state.name,
			bio:this.state.bio,
			contact:this.state.contact
		};
		console.log(newProfile);
		axios
			.post("users/update", newProfile)
			.then(function(res) {
				
				ls.set("username", res.data.user.name);
				
				window.location.reload();
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
									value={this.state.contact}
									error={errors.contact}
									id="contact"
									type="number"
								/>
								<label htmlFor="contact">contact</label>
							</div>
							
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.bio}
									error={errors.bio}
									id="bio"
									type="text"
									maxLength="250"
								/>
								<label htmlFor="bio">bio</label>
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


export default ProfileRecruiter;
