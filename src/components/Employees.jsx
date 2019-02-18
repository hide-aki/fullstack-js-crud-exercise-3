import React, { Component } from "react";
import Table from "./common/table/Table";

class Employees extends Component {
  state = {
    employees: []
  };

  //Delete employeer by Id & update the state
  handleDelite = async id => {
    await fetch(`http://localhost:8080/api/employees/${id}`, {
      method: "delete"
    }).then(async () => {
      await fetch(`http://localhost:8080/api/employees/`, {
        method: "get"
      })
        .then(response => response.json())
        .then(employees => {
          this.setState({ ...employees });
        });
    });
  };

  componentDidMount = async () => {
    await fetch(`http://localhost:8080/api/employees/`)
      .then(response => response.json())
      .then(employees => this.setState({ ...employees }));
  };

  render() {
    const { employees } = this.state;

    employees.filter(e => {
      if (e.assigned === 0) {
        return (e.assigned = "No");
      } else if (e.assigned === 1) {
        return (e.assigned = "Yes");
      }
      return e.assigned;
    });

    return <Table employees={employees} handleDelite={this.handleDelite} />;
  }
}

export default Employees;
