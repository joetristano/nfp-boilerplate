import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
//import BarChart from "../components/BarChart";
import Chart from 'chart.js/auto';

console.log("HOME");
export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [data,setData] = useState(null);
  const chartRef = useRef(null);


  useEffect(() => {

    const token = localStorage.getItem('token');
    const chartNode = chartRef.current;
    const ctx = chartNode.getContext('2d');

    async function fetchData() {

      const responses = await Promise.all([ fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }), fetch(`${process.env.NEXT_PUBLIC_API_URL}/plots/plot/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }) ])

      const stat0 = responses[0].status;
      const stat1 = responses[1].status;
      if (stat0 == 200 && stat1 == 200) {
        const userData = await responses[0].json();
        setUser(userData);

        const chartData = await responses[1].json();
        const theChart = new Chart(ctx,chartData);

        return function cleanup() {
          theChart.destroy();
        };
      } else {
        router.push('login');
      }


    }

    fetchData();

  }, []);


  return (
    <>
      <div>
        <h1>Home</h1>

        {user && (
          <p>{user.username}</p>
        )}
      </div>
       {chartRef && (

        <canvas ref={chartRef} />
      )}
    </> 
  )
}



