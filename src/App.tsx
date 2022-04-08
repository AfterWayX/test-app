import { useEffect, useState } from 'react';
import styled from '@emotion/styled'

import FirstPage from './pages/FirstPage';
import { getDatabase, ref , onValue } from "firebase/database";

 function App({app}:any) {
  const [data, setData] = useState<string[]>([])
  const database = getDatabase(app);
  useEffect(() => {
    async function getDates() {
      const dbRef = ref(database, 'names');
      onValue(dbRef, (snapshot) => {
        let dates: string[] = []
        snapshot.forEach((childSnapshot) => {
          dates.push(childSnapshot.val())
        });
        return setData(dates!)
      }, {
        onlyOnce: true
      });
    }
    getDates()
    return () => {
    }
  }, [])
 
  return (
    <section>
      {data.length > 1 && <FirstPage names={data}/>}
    </section>
  );
}

export default App;
