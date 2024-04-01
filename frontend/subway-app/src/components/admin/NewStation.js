import '../../styles/admin/newUser.css'


function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Station</h1>
      <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" id="name" placeholder="name" />
                  <label>Latitude</label>
                  <input type="text" id="lat" placeholder="Latitude" />
                  <label>Longitude</label>
                  <input type="text" id="lng" placeholder="Longitude" />
                  <label>City</label>
                  <select name="city" id="city" >
                      <option value="rome">Rome</option>
                      <option value="newyork">Newyork</option>
                  </select>
                  <label>Status</label>
                  <select name="status" id="status">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="underconstruction">Under Construction</option>
                  </select>
                  <label htmlFor="timeInput">Oppening Hours</label>
                  <input
                    type="time"
                    id="openning_at"
                    placeholder="openning at"
                  />
                  <label htmlFor="timeInput">Closing Hours</label>
                  <input
                    type="time"
                    id="closing_at"
                   placeholder="closing_at"
                  />
              <button className="addProductButton">Create</button>
              </div>


          </form>
    </div>
  );
}

export default NewUser;