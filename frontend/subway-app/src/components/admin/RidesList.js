// import "./userList.css";
import '../../styles/admin/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function RidesList() {
  const [data, setData] = useState([]);
    const handleDeleteRide = async (id) => {
    try {
      const response = await fetch('http://localhost:8000/api/delete_admin_ride/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed, such as authorization token
        },
      });const data = await response.json();

      if (response.ok) {
        console.log('User deleted successfully:', data);
        window.location.href="/rides"
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
                const response = await fetch('http://localhost:8000/api/admingetrides', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                const data = await response.json();
                console.log(data)
                if (data.status === 'success') {
                    console.log(data.rides)
                    if (data.rides.length>0) {
                          const transformedRides = data.rides.map(ride => ({
            id: ride.id,
            origin_station: ride.origin_station.name,
            destination_station: ride.destination_station.name,
            price: ride.price,
            duration: ride.duration,
            distance: ride.distance,
          }));
                        setData(transformedRides);
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
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const userType = localStorage.getItem('usertype');
      setIsAdmin(userType === 'admin');
    }, []);
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
            
            {isAdmin && (
              <>
              <Link to={"/ride/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDeleteRide(params.row.id)}
            />
            </>
            )}
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
      <div className="admincontainer">
        <Sidebar />
    <div className="userList">
    <div className="productTitleContainer">
        <h1 className="productTitle">Rides</h1>
        {isAdmin && (
        <Link to="/newride">
          <button className="productAddButton">Create</button>
        </Link>
        )}
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