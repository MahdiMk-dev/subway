// import "./userList.css";
import '../../styles/admin/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function FeedbacksList() {
  const [data, setData] = useState([]);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('admintoken');
                console.log(token)
                const response = await fetch('http://localhost:8000/api/admingetreviews', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                const data = await response.json();
                console.log(data)
                if (data.status === 'success') {
                    console.log(data.reviews)
                    if (data.reviews.length>0) {
                        const transformedReviews = data.reviews.map(review => ({
            id: review.id,
            name: review.passenger.first_name+' '+ review.passenger.last_name,
            trip:review.trip.id,
            rate: review.rate,
            review_content: review.review_content,
          }));
                        setData(transformedReviews);
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
    { field: "trip", headerName: "Trip", width: 120 },
    { field: "rate", headerName: "Rate", width: 120 },
    { field: "review_content", headerName: "Review", width: 400 }
  ];
  return (
    <div>
    <Topbar />
      <div className="admincontainer">
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
export default FeedbacksList;