import '../../styles/admin/newUser.css'
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function NewTrip() {
  return (
    <div>
    <Topbar />
      <div className="container">
        <Sidebar />
    <div className="newUser">
      <h1 className="newUserTitle">New Trip</h1>
         <form className="productForm">
              <div className="productFormLeft">
                 <label>Origin</label>
                  <select name="origin_station" id="origin" >
                      <option value="rome">Rome</option>
                      <option value="newyork">Newyork</option>
                  </select>
                  <label>Destination</label>
                  <select name="destination_station" id="destination" >
                      <option value="rome">Rome</option>
                      <option value="newyork">Newyork</option>
                      <option value="italy">italy</option>
                  </select>
                  <label>Price</label>
                  <input
                    type="number"
                    id="price"
                    placeholder="price"
                  />
                  <label>Status</label>
                  <select name="status" id="status">
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                  </select>
                  <label htmlFor="timeInput">Departure Time</label>
                  <input
                    type="datetime-local"
                    id="departure_time"
                  />
                  <label htmlFor="timeInput">Arrival Time</label>
                  <input
                    type="datetime-local"
                    id="arrival_time"
                  />
              <button className="addProductButton">Create</button>
              </div>


          </form>
    </div>
    </div>
</div>
  );
}

export default NewTrip;