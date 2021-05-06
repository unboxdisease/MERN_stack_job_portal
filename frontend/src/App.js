import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ls from "local-storage";

import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Welcome from "./components/Welcome";
import Addjob from "./components/jobs/addjob";
import Viewjob from "./components/jobs/Viewjob";
import SearchResult from "./components/search/Result";
import MyOrders from "./components/MyOrders";
import accepted from "./components/jobs/accepted";
import ProfileRecruiter from "./components/jobs/ProfileRecruiter";


import ProfileApplicant from "./components/jobs/ProfileApplicant";
import applications from "./components/jobs/applications";
import editjob from "./components/jobs/editjob"
// class App
class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Navbar />
					{ls.get("auth") === "true" ? (
						<Route exact path="/" component={Welcome} />
					) : (
							<Route exact path="/" component={Landing} />
						)}
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/addproduct" component={Addjob} />
					<Route exact path="/viewjob" component={Viewjob} />
					<Route exact path="/myorders" component={MyOrders} />
					<Route exact path="/accepted" component={accepted} />
					<Route exact path="/profileRecruiter" component={ProfileRecruiter} />
					
					<Route exact path="/ProfileApplicant" component={ProfileApplicant} />
					<Route exact path="/applications" component={applications} />
					<Route exact path="/editjob" component={editjob} />
					
					<Route
						exact
						path="/searchresult"
						component={SearchResult}
					/>
				</div>
			</Router>
		);
	}
}
export default App;
