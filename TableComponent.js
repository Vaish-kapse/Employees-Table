import { useTable, useSortBy } from "react-table";
import { useEffect, useMemo } from "react";
import { useSelector, connect } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const TableComponent = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id"
      },
      {
        Header: "First Name",
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        accessor: "lastName"
      },
      {
        Header: "Avatar",
        accessor: "imageUrl",
        Cell: ({ cell }) => (
          <img alt="avatar" src={cell.value} width="50" height="50" />
        )
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Contact Number",
        accessor: "contactNumber"
      },
      {
        Header: "Age",
        accessor: "age"
      },
      {
        Header: "Date of Birth",
        accessor: "dob"
      },
      {
        Header: "Salary",
        accessor: "salary"
      },
      {
        Header: "Address",
        accessor: "address"
      },
      {
        Header: "Edit",
        id: "edit",
        accessor: (row) => (
          <FaEdit className="icon" onClick={() => handleEdit(row.id)} />
        )
      },
      {
        Header: "Delete",
        id: "delete",
        accessor: (row) => (
          <FaTrash className="icon" onClick={() => handleDelete(row.id)} />
        )
      }
    ],
    []
  );

  const tableData = useSelector((state) => state.table.data);

  const handleEdit = (data) => {
    alert("edit");
  };

  const handleDelete = (data) => {
    alert("delete");
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data: tableData
    },
    useSortBy
  );

  useEffect(() => {
    axios
      .get("https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001")
      .then((response) => {
        // Dispatch an action to update the data in the store
        props.updateData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.updateData]);

  return (
    <table
      className="table table-bordered"
      {...getTableProps()}
      style={{ border: "solid 1px black" }}
    >
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps}>
            {headerGroup.headers.map((column, index) => (
              <th
                key={index}
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="text-center"
                style={{
                  backgroundColor: "grey",
                  borderBottom: "solid 3px black",
                  borderLeft: "solid 3px black",
                  borderRight: "solid 3px black",
                  padding: "8px",
                  color: "black"
                }}
              >
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr key={index} {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
                  <td
                    key={index}
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray"
                    }}
                    className="text-center"
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => {
  return {
    tableData: state.table
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateData: (data) => dispatch({ type: "FETCH_DATA", payload: data })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
