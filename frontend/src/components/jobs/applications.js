import React, { Component } from "react";
import ls from "local-storage";
import axios from "axios";
// const Validator = require("validator");
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
class applications extends Component {
	constructor(props) {
        super(props);
        // this.applicationsuccess = this.applicationsuccess.bind(this);
        // this.applicationreject = this.applicationreject.bind(this);
        this.state = {
            response: [],
            id: this.props.location.state.id,
            
          
        }
    }
	// const response;
	componentDidMount() {
		const data = { email: ls.get("email") , jobid : this.props.location.state.id};
		axios
			.post("/searchresult/myapplication", data)
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
		const data = {
			jobid:this.state.response[parseInt(arg/10)-1].jobid,
			applicationid: this.state.response[parseInt(arg/10)-1]._id,
			usermail:this.state.response[parseInt(arg/10)-1].usermail,
			title:this.state.response[parseInt(arg/10)-1].title
		};
		console.log(data);
		axios
			.post("/job/accept", data)
			.then(res => {
				console.log(res);
				// alert("Accepted applicant");
				// window.location.reload();
			})
			.catch(function(res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
		axios
			.post("/job/accept2", data)
			.then(res => {
				console.log(res);
				alert("Accepted applicant");
				window.location.reload();
			})
			.catch(function(res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	};
	onSort(event , sortKey ,val){
        const jobs = this.state.response;
        jobs.sort((a,b) => {
            var nameA , nameB;
            if(sortKey === 'rating')
            {
                if(a.ratecount!= 0)
                {
                    nameA = a.rating/a.ratecount;
                }
                else
                    nameA = 0

                if(b.ratecount != 0)
                {
                    nameB = b.rating/b.ratecount;
                }
                else
                    nameB = 0
            }
            else if(sortKey === 'date')
            {
                nameA = a.date;
                nameB = b.date;
            }
            else
            {
                nameA = a.name;
                nameB = b.name;
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

    onSubmitr = arg => e => {
		e.preventDefault();
		const data = {
			jobid:this.state.response[parseInt(arg/10)-1].jobid,
			applicationid: this.state.response[parseInt(arg/10)-1]._id
		};
		console.log(this.state.response[parseInt(arg/10)-1].name);
		axios
			.post("/job/reject", data)
			.then(res => {
				console.log(res);
				alert("rejected applicant");
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
			<td key={i++}>Applicants name  <Checkbox  defaultChecked indeterminate onClick = {e => this.onSort(e,'name',0)} ></Checkbox><Checkbox color="primary"  indeterminate defaultChecked onClick = {e => this.onSort(e,'name',1)} ></Checkbox></td>,
			<td key={i++}>Skills</td>,
			<td key={i++}>Date Of Application    <Checkbox  defaultChecked indeterminate onClick = {e => this.onSort(e,'date',0)} ></Checkbox><Checkbox color="primary"  indeterminate defaultChecked onClick = {e => this.onSort(e,'date',1)} ></Checkbox> </td>,
			<td key={i++}>Statement Of Purpose</td>,
			<td key={i++}>Rating  <Checkbox  defaultChecked indeterminate onClick = {e => this.onSort(e,'rating',0)} ></Checkbox><Checkbox color="primary"  indeterminate defaultChecked onClick = {e => this.onSort(e,'rating',1)} ></Checkbox></td>,
			<td key={i++}>Application Status</td>,
            <td key={i++}>Accept</td>,
            <td key={i++}>Reject</td>
		];

		table.push(<tr key={i++}>{heading}</tr>);
		for (const response of this.state.response) {
			let children = [];
			const {
				name,
				skills,
				date,
				SOP,
				status,
				rating,
				ratecount,
			} = response;

			children.push(
				<td id={i} key={i++}>
					{name}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{skills}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{date}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{SOP}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{(rating/ ratecount).toFixed(2) === "NaN"
						? 0
						: (rating/ ratecount).toFixed(2)}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{status}
				</td>
			);
			children.push(
                <td id={i} key={i++}>
                <form onSubmit={this.onSubmit(i - 1)}>
				{status === "Waiting" ? (
                    <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                    >
                        Accept
                    </button>
					) : null}
                </form>
            </td>
            );
            children.push(
                <td id={i} key={i++}>
                <form onSubmit={this.onSubmitr(i - 1)}>
                    <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                    >
                        Reject
                    </button>
                </form>
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
export default applications;
