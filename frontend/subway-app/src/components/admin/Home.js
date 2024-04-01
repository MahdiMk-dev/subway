import '../../styles/admin/home.css'
import WidgetSm from './WidgetSm';
import Coins from './Coins';
import HomeTrips from './HomeTrips';
function Home() {
  return (
    <div className="home">

      <div className="homeWidgets">
        <HomeTrips/>
        <Coins/>
      </div>
    </div>
  );
}
export default Home;