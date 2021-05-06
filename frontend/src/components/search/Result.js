import React, { Component } from "react";
import ls from "local-storage";
import axios from "axios";
import job from "../../../../backend/models/job";
const Validator = require("validator");
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import Select from "react-select";


class SearchResult extends Component {
	constructor() {
		super();
		this.state = {
			response: [],
			user:[],
			applied_to:[],
			selectedOption:"",
			num:""
		};
		this.job_type = [
			{ label: "Work From Home", value: "Work From Home" },
			{ label: "Half-Time", value: "Half-Time" },
			{label:"Full-Time",value:"Full-Time"}
			
		];
	}
	handleChange = selectedOption => {
		this.setState({ selectedOption });
		console.log(`Option selected:`, selectedOption);
	};
	// const response;
	componentDidMount() {
		const data = { search: ls.get("search") };
		axios
			.post("/searchresult", data)
			.then(res => {
				console.log(res.data);
				this.setState({ response: res.data });
			})
			.catch(function(res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
		const data2 = { email: ls.get("email") };

		axios
			.post("/", data2)
			.then(res2 => {
				this.setState({
					user : res2.data,
					applied_to:res2.data[0].applied_to,
					num : res2.data[0].no_applied,
					status:res2.data[0].status
				});
				// console.log(res2.data)
			})
			.catch(function (res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	}

	// onChange = e => {
	// 	this.setState({ [e.target.id]: e.target.value });
	// };

	


	onSubmitorder = arg => event => {
		event.preventDefault();
		
		// console.log(((arg-8)/12)-1);
		const applicationdata = {
			name:ls.get("username"),
			title:this.state.response[((arg-8)/12)-1].title,
			jobid:this.state.response[((arg-8)/12)-1]._id,
			salary:this.state.response[((arg-8)/12)-1].salary,
			skills:ls.get("skillset"),
			sop:document.getElementById(arg - 5).value,
			recruitermail:document.getElementById(arg - 6).innerHTML,
			job_type:this.state.response[((arg-8)/12)-1].job_type,
			usermail:ls.get("email"),
			rating:this.state.user[0].rating,
			ratecount:this.state.user[0].ratecount
		};
		
		// if (!Validator.isInt(orderdata.order_quantity)) {
		// 	alert("Invalid Order Quantity");
		// 	window.location.reload();
		// 	return;
		// }
	

		axios
			.post("/job/edit", applicationdata)
			.then(res => {
				
				console.log(applicationdata);
				
				
			})
			.catch(function(res) {
				console.log(applicationdata);
				
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
		const id = {
			id:this.state.user[0]._id,
			title:this.state.response[((arg-8)/12)-1].title
		}
		// console.log(id)
		axios
			.post("/users/applied", id)
			.then(res => {
				// alert("applied Successfuly");
				// console.log(applicationdata);
				
				// window.location.reload();
			})
			.catch(function(res) {
				console.log(id);
				
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
		const id2 = {
			id : this.state.response[((arg-8)/12)-1]._id
		}
		axios
			.post("/job/apply", id2)
			.then(res => {
				alert("applied Successfuly");
				// console.log(applicationdata);
				
				window.location.reload();
			})
			.catch(function(res) {
				console.log(id);
				
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
		
	};
	Filtertype = e => {
       
        e.preventDefault()
        let listings = this.state.response;
        // console.log(listings);
        let duration = this.state.duration;
  
        const result = listings.filter(listings => listings.job_type.includes(this.state.selectedOption.value));
        this.setState({response: listings});
        this.setState({
            response : result,
            

        });

        console.log(result);
        
    }
	onSort(event , sortKey ,val){
        const jobs = this.state.response;
        jobs.sort((a,b) => {
            var nameA , nameB;
            if(sortKey === 'rating')
            {
                if(a.ratecount!= 0)
                {
                    nameA = a.job_rating/a.ratecount;
                }
                else
                    nameA = 0

                if(b.ratecount != 0)
                {
                    nameB = b.job_rating/b.ratecount;
                }
                else
                    nameB = 0
            }
            else if(sortKey === 'salary')
            {
                nameA = a.salary;
                nameB = b.salary;
            }
            else
            {
                nameA = a.duration;
                nameB = b.duration;
            }
            if (nameA < nameB) {
                if(val)return -1;
                else  return 1;
            }
            if (nameA > nameB) {
                if(val) return 1;
                else return -1;
            }
            return 0;
        })
        this.setState({response: jobs})
        console.log(jobs)
	}
	createTable() {
		const { selectedOption } = this.state;
		let table = [];
		let i = 0;
		let j=0;
		let heading = [
			<td key={i++}>Job Title  </td>,
			<td key={i++}>Salary <Checkbox  defaultChecked indeterminate onClick = {e => this.onSort(e,'salary',0)} ></Checkbox><Checkbox color="primary"  indeterminate defaultChecked onClick = {e => this.onSort(e,'salary',1)} ></Checkbox></td>,
			<td key={i++}>No. of Applicants</td>,
			<td key={i++}>Recruiters - Email</td>,
			<td key={i++}>SOP</td>,
			<td key={i++}>Deadline</td>,
			<td key={i++}>Duration <Checkbox  defaultChecked indeterminate onClick = {e => this.onSort(e,'duration',0)} ></Checkbox><Checkbox color="primary"  indeterminate defaultChecked onClick = {e => this.onSort(e,'duration',1)} ></Checkbox></td>,
			<td key={i++}>Job Type  <Select
			
			id="job_type"
			placeholder="job type"
			value={selectedOption}
			onChange={this.handleChange}
			options={this.job_type}
		/><Checkbox  defaultChecked indeterminate onClick = {e => this.Filtertype(e)} /></td>,
			<td key={i++}>Average Job Rating <Checkbox  defaultChecked indeterminate onClick = {e => this.onSort(e,'rating',0)} ></Checkbox><Checkbox color="primary"  indeterminate defaultChecked onClick = {e => this.onSort(e,'rating',1)} ></Checkbox></td>,
			<td key={i++}>APPLY</td>
			
			
			
		];
		
		
		table.push(<tr key={i++}>{heading}</tr>);
		for (const response of this.state.response) {
			let children = [];
			const {
				title,
				salary,
				no_of_applicants,
				recruitermail,
				job_rating,
				ratecount,
				deadline,
				job_type,
				duration,
				positions
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
					{no_of_applicants}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{recruitermail}
				</td>
			);
			children.push(
				<td key={i++}>
					<input
						id={i-1}
						
						style={{ width: 100 }}
						className="form-control mr-sm-2"
						type="text"
						placeholder="Statement"
						aria-label="SOP"
					></input>
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{/* {(job_rating/ ratecount).toFixed(2) === "NaN"
						? 0
						: (job_rating/ ratecount).toFixed(2)} */}
					{deadline}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{duration}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{job_type}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{(job_rating/ ratecount).toFixed(2) === "NaN"
						? 0
						: (job_rating/ ratecount).toFixed(2)}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
				{ this.state.status == "Waiting" ? (
				<div>
						{ (no_of_applicants>=1 && positions>=1 )? (
					<div>
						{ this.state.num <=10 ? (
						<form onSubmit={this.onSubmitorder(i - 1)}>
						{this.state.applied_to.includes(title) && this.state.num <=10 ? (
							<p
								
							>
								APPLIED
							</p>
						) : 
						<button
								className="btn btn-outline-success my-2 my-sm-0"
								type="submit"
							>
								APPLY
							</button>
						} 
						</form>
						) : 
						<p>10 Applications Done</p>
						}
						</div>
						):<button
						className="btn btn-outline-success my-2 my-sm-0"
						disabled
					>
						FULL
					</button>}
						</div>
						): <button
						className="btn btn-outline-success my-2 my-sm-0"
						disabled
					>
						CANNOT APPLY
					</button>}
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
export default SearchResult;
