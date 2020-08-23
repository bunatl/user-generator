import React, { useState, useEffect } from 'react';

// import styles
import '../styles/styles.scss';

// import components
import Profile from '../Profile';
import Parameters from '../Parameters';
import Footer from '../Footer'

interface pics {
  large: string,
  medium: string,
  thumbnail: string
}

export interface Person {
  pic: pics;
  name: string;
  email: string;
  dob: string;
  address: string;
  number: string;
  userName: string;
  pssw: string;
};

const initPerson: Person = {
  pic: {
    large: "",
    medium: "",
    thumbnail: ""
  },
  name: "",
  email: "",
  dob: "",
  address: "",
  number: "",
  userName: "",
  pssw: ""
};

const App: React.FC = () => {
  const [ profile, setProfile ] = useState<Person>(initPerson);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ params, setParams ] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const url = `https://randomuser.me/api/${params !== '' ? params : ''}`;
        const res = await fetch(url, {
          method: "GET"
        })
        const jsonRes = await res.json();
        const result = jsonRes.results[ 0 ];

        const createDOBD = (): string => {
          const date = new Date(result.dob.date);
          return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} (${result.dob.age} yo)`
        }

        setProfile({
          pic: result.picture,
          name: `${result.name.first} ${result.name.last}`,
          email: result.email,
          dob: createDOBD(),
          address: `${result.location.street.name} ${result.location.street.number}, ${result.location.city}, ${result.location.state}, ${result.location.postcode}`,
          number: result.phone,
          userName: result.login.username,
          pssw: result.login.password
        });

      } catch (e) {
        console.error(`During data fetching error: '${e}' has occured. Data will be fetched again...`);
        fetchData();
      }
      setLoading(false);
    }
    // init async function
    fetchData();
  }, [ params ]);

  return (
    <div id="app">
      <h1>Random user generator <span role="img" aria-label="reload">🔃</span></h1>
      <div id="content">
        {loading ? "loading text" : <Profile obj={profile} />}
        <Parameters updateParameters={x => setParams(x)} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
