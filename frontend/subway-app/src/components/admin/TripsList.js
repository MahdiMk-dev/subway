// import "./userList.css";
import '../../styles/admin/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { tripRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import Topbar from './Topbar';
import Sidebar from './Sidebar';
function TripsList() {
  const [data, setData] = useState(tripRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "origin_station", headerName: "Origin", width: 200 },
    { field: "destination_station", headerName: "Destination", width: 120 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "departure_time", headerName: "Departure Time", width: 120 },
    { field: "arrival_time", headerName: "Arrival Time", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/trip/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div>
    <Topbar />
      <div className="container">
        <Sidebar />
    <div className="userList">
    <div className="productTitleContainer">
        <h1 className="productTitle">Trips</h1>
        <Link to="/newtrip">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
    </div>
</div>
  );
}
export default TripsList;