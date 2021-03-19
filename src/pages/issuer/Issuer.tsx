import React, {useContext, useState, useEffect} from 'react';
import AppContext from 'context/app';
import {Button, FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import ApiService from 'utils/apiService';
import {drivingLicenseVCData} from 'utils/vc-data-examples/drivinglicense';
import {UnsignedW3cCredential, W3cCredential} from 'utils/apis';
import 'pages/issuer/Issuer.scss'
import firebase from 'utils/firebase/firebase';
import AdminList from 'components/admin/AdminList';

interface State {
    currentUnsignedVC: UnsignedW3cCredential | null,
    currentSignedVC: W3cCredential | null,
    isCurrentVCVerified: boolean,
}
  
const Issuer: React.FC = (): React.ReactElement => {
  const [state, setState] = useState<State>({
      currentUnsignedVC: null,
      currentSignedVC: null,
      isCurrentVCVerified: false
  })
  const {appState} = useContext(AppContext);
  const [data, setData] = useState<any>([]);
    
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const fetch = await db.collection('drivinglicense-demo-1').get()
      // const information = fetch.docs.map(doc => doc.data())
      const information = fetch.docs.map(doc => {return {...doc.data(), docID: doc.id}})
      setData(information)
    }
    fetchData();
  }, [])

  return (
      <div className='tutorial'>
        {data.map((x:any) => <div key={x.docID}><AdminList data={x}/></div>)}
      </div>
  )
}

export default Issuer;