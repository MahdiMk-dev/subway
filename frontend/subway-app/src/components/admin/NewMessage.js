import '../../styles/admin/newUser.css'
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function NewMessage() {
  return (
    <div>
    <Topbar />
      <div className="container">
        <Sidebar />
    <div className="newUser">
      <h1 className="newUserTitle">New Message</h1>
         <form className="productForm">
              <div className="productFormLeft">
                 <label>Passenger</label>
                  <select name="passenger" id="name" >
                      <option value="mahsi">Mahdi</option>
                      <option value="test">tets</option>
                  </select>
                  <label>Message</label>
                  <textarea
                    id="message"
                    placeholder="Message"
                  />
              <button className="addProductButton">Create</button>
              </div>


          </form>
    </div>
    </div>
</div>
  );
}

export default NewMessage;