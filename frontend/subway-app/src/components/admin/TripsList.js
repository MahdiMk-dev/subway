// import "./userList.css";
import '../../styles/admin/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Topbar from './Topbar';
import Sidebar from './Sidebar';
function TripsList() {
  const [data, setData] = useState([]);
    const handleDeleteTrip = async (id) => {
    try {
      const response = await fetch('http://localhost:8000/api/delete_admin_trip/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed, such as authorization token
        },
      });const data = await response.json();

      if (response.ok) {
        console.log('User deleted successfully:', data);
        window.location.href="/trips"
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
                const response = await fetch('http://localhost:8000/api/admingettrips', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                const data = await response.json();
                console.log(data)
                if (data.status === 'success') {
                    console.log(data.trips)
                    if (data.trips.length>0) {
                        const transformedTrips = data.trips.map(trip => ({
            id: trip.id,
            origin_station: trip.origin_station.name,
            destination_station: trip.destination_station.name,
            price: trip.price,
            status: trip.status,
            departure_time: trip.departure_time,
            arrival_time: trip.arrival_time,
          }));
                        setData(transformedTrips);
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
              onClick={() => handleDeleteTrip(params.row.id)}
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