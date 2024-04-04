// import "./userList.css";
import '../../styles/admin/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Topbar from './Topbar';
import Sidebar from './Sidebar';
function StationsList() {
  const [data, setData] = useState([]);
  const handleDeleteStation = async (id) => {
    try {
      const response = await fetch('http://localhost:8000/api/delete_admin_station/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed, such as authorization token
        },
      })
      if (response.ok) {
        console.log('User deleted successfully:', data);
        window.location.href="/stations"
        // Optionally, update state or perform any other actions after deletion
      } else {
        console.error('Failed to delete user:', data);
        // Handle error response
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other exceptions
    }};
   
    const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem('usertype');
    setIsAdmin(userType === 'admin');
  }, []);
  useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('admintoken');
                console.log(token)
                const response = await fetch('http://localhost:8000/api/admingetstations', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                const data = await response.json();
                console.log(data)
                if (data.status === 'success') {
                    console.log(data.stations)
                    if (data.stations.length>0) {

                        setData(data.stations);
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
    { field: "lat", headerName: "Latitude", width: 120 },
    { field: "lng", headerName: "Longitude", width: 120 },
    { field: "city", headerName: "City", width: 120 },
    { field: "openning_at", headerName: "Oppening Hours", width: 120 },
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
             {isAdmin && (
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDeleteStation(params.row.id)}
            />)}
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
        <h1 className="productTitle">Stations</h1>
        {isAdmin && (
        <Link to="/newstation">
          <button className="productAddButton">Create</button>
        </Link>
        )}
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
export default StationsList;