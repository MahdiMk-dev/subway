// import "./userList.css";
import '../../styles/admin/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { messageRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function MessagesList() {
  const [data, setData] = useState(messageRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Passenger", width: 200 },
    { field: "message", headerName: "Message", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/message/" + params.row.id}>
              <button className="userListEdit">View</button>
            </Link>
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
        <h1 className="productTitle">Messages</h1>
        <Link to="/newmessage">
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
export default MessagesList;