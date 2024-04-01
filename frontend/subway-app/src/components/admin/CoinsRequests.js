// import "./userList.css";
import '../../styles/admin/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { coinRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import Topbar from './Topbar';
import Sidebar from './Sidebar';
function CoinsRequests() {
  const [data, setData] = useState(coinRows);
  const handleApprove = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const handleReject = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Passenger", width: 200 },
    { field: "amount", headerName: "Amount", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
              <button className="userListEdit" onClick={() => handleApprove(params.row.id)}>Approve</button>
               <button className="userListEdit" onClick={() => handleReject(params.row.id)}>Reject</button>
              
           
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
export default CoinsRequests;