import React, { Component } from "react";
import axios from "axios";
import ls from "local-storage";
import Checkbox from '@material-ui/core/Checkbox';
class accepted extends Component {
	constructor() {
		super();
		this.state = {
			response: []
		};
	}
	// const response;
	componentDidMount() {
		const data = { mail: ls.get("email")};
		axios
			.post("job/accepted", data)
			.then(res => {
				this.setState({ response: res.data });
			})
			.catch(function(res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	}
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
			else if(sortKey === 'title')
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

	onSubmit = arg => e => {
		e.preventDefault();
		console.log((arg-14)/9)

		const orderdata = {
			name:this.state.response[(arg-14)/9].name,
			rating :document.getElementById(arg-1).value
		};
		axios
			.post("/users/rate", orderdata)
			.then(res => {
				console.log("hi");
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
			<td key={i++}>Name <Checkbox  defaultChecked indeterminate onClick = {e => this.onSort(e,'name',0)} ></Checkbox><Checkbox color="primary"  indeterminate defaultChecked onClick = {e => this.onSort(e,'name',1)} ></Checkbox></td>,
			<td key={i++}>Date <Checkbox  defaultChecked indeterminate onClick = {e => this.onSort(e,'date',0)} ></Checkbox><Checkbox color="primary"  indeterminate defaultChecked onClick = {e => this.onSort(e,'date',1)} ></Checkbox></td>,
			<td key={i++}>Job Type</td>,
			<td key={i++}>Job Title  <Checkbox  defaultChecked indeterminate onClick = {e => this.onSort(e,'title',0)} ></Checkbox><Checkbox color="primary"  indeterminate defaultChecked onClick = {e => this.onSort(e,'title',1)} ></Checkbox></td>,
			<td key={i++}>Rating <Checkbox  defaultChecked indeterminate onClick = {e => this.onSort(e,'rating',0)} ></Checkbox><Checkbox color="primary"  indeterminate defaultChecked onClick = {e => this.onSort(e,'rating',1)} ></Checkbox></td>,
			<td key={i++}>Rate Applicant</td>,
			<td key={i++}>Rate</td>
		];
		table.push(<tr key={i++}>{heading}</tr>);
		for (const response of this.state.response) {
			let children = [];
			const { name, date,job_type,title ,rating,ratecount} = response;

			children.push(
				<td id={i} key={i++}>
					{name}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{date}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{job_type}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{title}
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
			)
			children.push(
				<td id={i} key={i++}>
					<form onSubmit={this.onSubmit(i - 1)}>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							Rate
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
			<table>
				<tbody>{table}</tbody>
			</table>
		);
	}
}

export default accepted;
