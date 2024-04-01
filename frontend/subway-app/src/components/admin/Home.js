import '../../styles/admin/home.css'
import Coins from './Coins';
import HomeTrips from './HomeTrips';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function Home() {
  return (
    <div>
    <Topbar />
      <div className="container">
        <Sidebar />
    <div className="home">

      <div className="homeWidgets">
        <HomeTrips/>
        <Coins/>
      </div>
    </div>
    </div>
</div>
  );
}
export default Home;