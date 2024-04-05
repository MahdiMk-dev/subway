// import "./userList.css";
import '../../styles/admin/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Topbar from './Topbar';
import Sidebar from './Sidebar';
function UserList() {
  const [data, setData] = useState([]);

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch('http://localhost:8000/api/delete_admin_user/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed, such as authorization token
        },
      });const data = await response.json();

      if (response.ok) {
        console.log('User deleted successfully:', data);
        window.location.href="/users"
        // Optionally, update state or perform any other actions after deletion
      } else {
        console.error('Failed to delete user:', data);
        // Handle error response
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other exceptions
    }
  };
  useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('admintoken');
                console.log(token)
                const response = await fetch('http://localhost:8000/api/getusers', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                const data = await response.json();
                console.log(data)
                if (data.status === 'success') {
                    console.log(data.users)
                    if (data.users.length>0) {

                        setData(data.users);
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
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "station", headerName: "Station", width: 120 },
    { field: "phone_number", headerName: "Phone", width: 120 },
    { field: "type", headerName: "Type", width: 120 },
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
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDeleteUser(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div>
    <Topbar />
      <div className="admincontainer">
        <Sidebar />
    <div className="userList">
    <div className="productTitleContainer">
        <h1 className="productTitle">Users</h1>
        <Link to="/newuser">
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
export default UserList;