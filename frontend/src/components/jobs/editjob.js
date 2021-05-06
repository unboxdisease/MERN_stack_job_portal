import React, { Component } from "react";
import ls from "local-storage";
import axios from "axios";
// const Validator = require("validator");

class editjob extends Component {
	constructor() {
        super();
        // this.applicationsuccess = this.applicationsuccess.bind(this);
        // this.applicationreject = this.applicationreject.bind(this);
        this.state = {
            pos:"",
            
            dura :"",
            no_app:"",
            errors: {}
          
        }
    }
    // componentDidMount(){
    //     console.log(this.props.location.state.id)
    // }
    onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};
	// const response;
	
    onSubmit = e => {
		e.preventDefault();
		const data = {
			jobid:this.props.location.state.id,
            pos:this.state.pos,
            dura:this.state.dura,
            no_app:this.state.no_app
		};
		console.log(data);
		axios
			.post("/job/edit2", data)
			.then(res => {
				console.log(res);
				alert("job details edited");
				
			})
			.catch(function(res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
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
								<b>Edit Job</b>
							</h4>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.no_app}
									error={errors.no_app}
									id="no_app"
									type="number"
								/>
								<label htmlFor="no_app">No. of Applicants</label>
							</div>
							
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.pos}
									error={errors.pos}
									id="pos"
									type="number"
									
								/>
								<label htmlFor="pos">Positions</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.dura}
									error={errors.dura}
									id="dura"
									type="number"
								/>
								<label htmlFor="dura">Duration</label>
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
export default editjob;
