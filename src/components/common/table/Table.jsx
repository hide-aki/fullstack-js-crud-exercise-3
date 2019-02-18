import React, { Component } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import ExportCSV from "../exportCSV/ExportCSV";

class Table extends Component {
  state = {
    data: {
      name: "",
      code: "",
      profession: "",
      color: "",
      city: "",
      branch: "",
      assigned: null
    },
    errors: {}
  };

  iconFormatter(row) {
    return <i style={{ color: row }} className="fas fa-circle" />;
  }

  deleteFormatter() {
    return <button className="btn btn-danger btn-sm">Delete</button>;
  }

  render() {
    let { employees, handleDelite } = this.props;
    const { SearchBar } = Search;

    const columns = [
      {
        dataField: "color",
        text: "Color",
        editor: {
          type: Type.SELECT,
          options: [
            {
              value: "#FF6600",
              label: "#FF6600"
            },
            {
              value: "yellow",
              label: "yellow"
            },
            {
              value: "green",
              label: "green"
            },
            {
              value: "#333333",
              label: "#333333"
            },
            {
              value: "red",
              label: "red"
            }
          ]
        },
        headerStyle: {
          width: "3em"
        },
        align: "center",
        formatter: this.iconFormatter
      },
      {
        dataField: "name",
        text: "Name",
        sort: true
      },
      {
        dataField: "code",
        text: "Code",
        editor: {
          type: Type.SELECT,
          options: [
            {
              value: "F100",
              label: "F100"
            },
            {
              value: "F101",
              label: "F101"
            },
            {
              value: "F102",
              label: "F102"
            },
            {
              value: "F103",
              label: "F103"
            },
            {
              value: "F104",
              label: "F104"
            },
            {
              value: "F105",
              label: "F105"
            },
            {
              value: "F106",
              label: "F106"
            }
          ]
        },
        sort: true
      },
      {
        dataField: "city",
        text: "City",
        editor: {
          type: Type.SELECT,
          options: [
            {
              value: "Toronto",
              label: "Toronto"
            },
            {
              value: "Brampton",
              label: "Brampton"
            },
            {
              value: "Bolton",
              label: "Bolton"
            }
          ]
        },
        sort: true
      },
      {
        dataField: "profession",
        text: "Profession",
        editor: {
          type: Type.SELECT,
          options: [
            {
              value: "Drywall Installer",
              label: "Drywall Installer"
            },
            {
              value: "Runner",
              label: "Runner"
            }
          ]
        },
        sort: true
      },
      {
        dataField: "branch",
        text: "Branch",
        editor: {
          type: Type.SELECT,
          options: [
            {
              value: "Abacus",
              label: "Abacus"
            },
            {
              value: "Pillsworth",
              label: "Pillsworth"
            }
          ]
        },
        sort: true
      },
      {
        dataField: "assigned",
        text: "Assigned",

        editor: {
          type: Type.SELECT,
          options: [
            {
              value: "Yes",
              label: "Yes"
            },
            {
              value: "No",
              label: "No"
            }
          ]
        },
        headerStyle: {
          width: "6em"
        },
        sort: true
      },
      {
        dataField: "delete",
        text: "",
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            handleDelite(row.id);
          }
        },
        csvExport: false,
        align: "center",
        editable: false,
        headerStyle: {
          width: "4.5em"
        },
        formatter: this.deleteFormatter
      }
    ];

    const cellEdit = cellEditFactory({
      mode: "click",
      beforeSaveCell: (oldValue, newValue, row, column, done) => {
        setTimeout(() => {
          if (newValue.length >= 1) {
            done(); // contine to save the changes
          } else {
            done(false); // reject the changes
          }
        }, 0);
      },

      afterSaveCell: async (oldValue, newValue, row, column) => {
        let item = {
          name: row.name,
          code: row.code,
          profession: row.profession,
          color: row.color,
          city: row.city,
          branch: row.branch,
          assigned: row.assigned
        };

        await fetch(`http://localhost:8080/api/employees/${row.id}`, {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ user: item })
        });
      }
    });

    return (
      <ToolkitProvider
        keyField="id"
        data={employees}
        columns={columns}
        search
        exportCSV
      >
        {props => (
          <div>
            <div className="mb-3">
              <Link
                to="/employees/new"
                className="btn btn-primary btn-sm mr-2"
                role="button"
              >
                New Employer
              </Link>
              <ExportCSV {...props.csvProps} />
            </div>
            <SearchBar {...props.searchProps} />
            <hr />

            <BootstrapTable
              {...props.baseProps}
              bootstrap4
              pagination={paginationFactory()}
              // bordered={false}
              striped
              hover
              condensed
              responsive
              noDataIndication="Table is Empty"
              cellEdit={cellEdit}
            />
          </div>
        )}
      </ToolkitProvider>
    );
  }
}

export default Table;
