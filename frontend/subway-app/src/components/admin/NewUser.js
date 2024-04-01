import '../../styles/admin/newUser.css'


function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  id="name"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Type</label>
                <select
                  placeholder="type"
                  id="type"
                  className="userUpdateInput"
                >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  id="phone_number"
                  placeholder="phone"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Status</label>
                <select
                  className="userUpdateInput"
                >
                 <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Station</label>
                <select
                  className="userUpdateInput"
                >
                 <option value="rome">Rome</option>
                <option value="italy">Italy</option>
                </select>
              </div>
              <button className="addProductButton">Create</button>
              </div>


          </form>
    </div>
  );
}

export default NewUser;