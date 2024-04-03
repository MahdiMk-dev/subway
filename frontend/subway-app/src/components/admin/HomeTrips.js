import '../../styles/admin/widgetlg.css';
import { useState, useEffect } from "react";

function HomeTrips() {
  const [trips, setTrips] = useState([]);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('admintoken');
        console.log(token)
        const response = await fetch('http://localhost:8000/api/admin_dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        const data = await response.json();
        if(data.status === 'success') {
          const transformedTrips = data.trips.map(trip => ({
            id: trip.id,
            origin_station: trip.origin_station.name,
            destination_station: trip.destination_station.name,
            price: trip.price,
            status: trip.status,
            departure_time: trip.departure_time,
            arrival_time: trip.arrival_time,
          }));
          setTrips(transformedTrips);
         console.log(data)
        } else {
          alert(data.message);
          window.location.href = '/admin_login';
        }
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Trips</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Origin</th>
          <th className="widgetLgTh">Destination</th>
          <th className="widgetLgTh">Arrival Time</th>
          <th className="widgetLgTh">Departure Time</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {trips.map((trip, index) => (
          <tr key={index} className="widgetLgTr">
            <td className="widgetLgUser">
              <span className="widgetLgName">{trip.origin_station}</span>
            </td>
            <td className="widgetLgAmount">{trip.destination_station}</td>
            <td className="widgetLgAmount">{trip.arrival_time}</td>
            <td className="widgetLgAmount">{trip.departure_time}</td>
            <td className="widgetLgStatus">
              <Button type={trip.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default HomeTrips;

