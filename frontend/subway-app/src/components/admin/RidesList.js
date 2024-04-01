// import "./userList.css";
import '../../styles/admin/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { rideRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function RidesList() {
  const [data, setData] = useState(rideRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "origin_station", headerName: "Origin", width: 200 },
    { field: "destination_station", headerName: "Destination", width: 120 , },
    { field: "price", headerName: "Price", width: 120 },
    { field: "duration", headerName: "Duration", width: 120 },
    { field: "distance", headerName: "Distance", width: 120  },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/ride/" + params.row.id}>
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
  const formattedData = data.map(ride => ({
    ...ride,
    duration: `${ride.duration} hrs`,
    distance: `${ride.distance} Km`
  }));
  return (
    <div>
    <Topbar />
      <div className="container">
        <Sidebar />
    <div className="userList">
    <div className="productTitleContainer">
        <h1 className="productTitle">Rides</h1>
        <Link to="/newride">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
         rows={formattedData}
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
export default RidesList;