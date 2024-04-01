// import "./userList.css";
import '../../styles/admin/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { stationRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import Topbar from './Topbar';
import Sidebar from './Sidebar';
function StationsList() {
  const [data, setData] = useState(stationRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "lat", headerName: "Latitude", width: 120 },
    { field: "lng", headerName: "Longitude", width: 120 },
    { field: "city", headerName: "City", width: 120 },
    { field: "oppening_at", headerName: "Oppening Hours", width: 120 },
    { field: "closing_at", headerName: "Closing Hours", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          
          <>
            <Link to={"/station/" + params.row.id}>
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
    <div className="userList">
    <div className="productTitleContainer">
        <h1 className="productTitle">Stations</h1>
        <Link to="/newstation">
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
  );
}
export default StationsList;