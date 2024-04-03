import '../../styles/admin/userList.css';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function CoinsRequests() {
  const [data, setData] = useState([]);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('admintoken');
      const response = await fetch('http://localhost:8000/api/approverequest/' + id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();

       if (data.status === 'success') { 

        console.log('Request approved successfully:', data);
        fetchData();
      } else {
        console.error('Failed to approve request:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('admintoken');
      const response = await fetch(`http://localhost:8000/api/rejectrequest/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

          'Authorization': `Bearer ${token}`
        },
      });
      const responseData = await response.json();;
      console.log(responseData)
      if (responseData.status === 'success') {
        console.log('Request rejected successfully:', responseData);
        fetchData();
      } else {
        console.error('Failed to reject request:', responseData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('admintoken');
      const response = await fetch('http://localhost:8000/api/admingetcoinrequests', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const responseData = await response.json();
      if (responseData.status === 'success') {
        console.log(responseData)
        const transformedrequests = responseData.coins.map(request => ({
            id: request.id,
            name: request.passenger.first_name+' '+request.passenger.last_name,
            amount: request.amount,
            status: request.status,
          }));
        setData(transformedrequests);
        console.log(responseData.coins)
      } else {
        alert(responseData.message);
        window.location.href = '/admin_login';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Passenger', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => (
        <>
          {params.row.status === 'pending' && (
            <>
              <button className="userListEdit" onClick={() => handleApprove(params.row.id)}>Approve</button>
              <button className="userListEdit" onClick={() => handleReject(params.row.id)}>Reject</button>
            </>
          )}
        </>
      ),
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
