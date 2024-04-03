import '../../styles/admin/widgetlg.css';
import { useState, useEffect } from "react";

function Coins() {
    const [coins, setCoins] = useState([]);

    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
    };

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
                console.log(data)
                if (data.status === 'success') {
                    console.log(data.coins)
                    if (data.coins) {
                        const transformedCoins = data.coins.map(coin => ({
                            id: coin.id,
                            name: coin.passenger.first_name + ' ' + coin.passenger.last_name,
                            amount: coin.amount,
                            status: coin.status,
                        }));

                        setCoins(transformedCoins);
                    }
                } else {
                    alert(data.message);
                    window.location.href = '/admin_login';
                }

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    console.log(coins);

    return (
        <div className="widgetLg">
            {coins.length > 0 && (
                <>
                    <h3 className="widgetLgTitle">Latest Coins Requests</h3>
                    <table className="widgetLgTable">
                        <thead>
                            <tr className="widgetLgTr">
                                <th className="widgetLgTh">Name</th>
                                <th className="widgetLgTh">Amount</th>
                                <th className="widgetLgTh">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coins.map((coin, index) => (
                                <tr key={index} className="widgetLgTr">
                                    <td className="widgetLgUser">
                                        <span className="widgetLgName">{coin.name}</span>
                                    </td>
                                    <td className="widgetLgAmount">{coin.amount}</td>
                                    <td className="widgetLgStatus">
                                        <Button type={coin.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default Coins;
