// import "./userList.css";
import '../../styles/admin/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function MessagesList() {
  const [data, setData] = useState([]);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('admintoken');
                console.log(token)
                const response = await fetch('http://localhost:8000/api/admingetmessages', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                const data = await response.json();
                console.log(data)
                if (data.status === 'success') {
                    console.log(data.messages)
                    if (data.messages.length>0) {
                        const transformedMessages = data.messages.map(message => ({
            id: message.id,
            name: message.passenger.first_name+' '+message.passenger.last_name,
            message: message.content,
          }));
                        setData(transformedMessages);
                        console.log(transformedMessages)
                    }
                }
                 else {
                    alert(data.message);
                    window.location.href = '/admin_login';
                }

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Passenger", width: 200 },
    { field: "message", headerName: "Message", width: 120 },

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