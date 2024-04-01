// import "./userList.css";
import '../../styles/admin/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { feedbackRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
function FeedbacksList() {
  const [data, setData] = useState(feedbackRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Passenger", width: 200 },
    { field: "trip", headerName: "Trip", width: 120 },
    { field: "rate", headerName: "Rate", width: 120 },
    { field: "review_content", headerName: "Review", width: 400 }
  ];
  return (
    <div className="userList">
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
export default FeedbacksList;