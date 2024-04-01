import '../../styles/admin/newUser.css'


function NewRide() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Ride</h1>
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
                  <label>Duration</label>
                  <input
                    type="number"
                    id="duration"
                    placeholder="duration"
                  />
                  <label>Distance</label>
                  <input
                    type="number"
                    id="distance"
                    placeholder="distance"
                  />
              <button className="addProductButton">Create</button>
              </div>


          </form>
    </div>
  );
}

export default NewRide;