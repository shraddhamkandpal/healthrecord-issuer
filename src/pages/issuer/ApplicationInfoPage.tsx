import React from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import ApiService from 'utils/apiService';
import { UnsignedW3cCredential } from 'utils/apis';
import { routes } from 'constants/routes';
import firebase from 'utils/firebase/firebase';

interface IProps {
  children?: React.ReactNode,
  location?: any
}

const ApplicationInfoPage: React.FC<IProps & RouteComponentProps> = (props: IProps): React.ReactElement => {
  const { payload, applicationID, docID } = props.location.state.state;
  const { givenName, familyName } = payload.credentialSubject.data;
  const { idClass, issueDate, issuer } = payload.credentialSubject.data.hasIDDocument.hasIDDocument;
  const { country, drivingClass } = JSON.parse(idClass)
  const unsignedVC: UnsignedW3cCredential = payload;

  const history = useHistory();
  
  /**
   * Function for signing an unsigned VC.
  * */
  const approveVC = async () => {
    try {
      // sign the VC
      const {signedCredential} = await ApiService.signVC({
        unsignedCredential: unsignedVC
      })

      // store the VC
      await ApiService.storeSignedVCs({
        data: [signedCredential]
      });

      alert('Unsigned VC has been approved and successfully signed.');

      history.push(routes.ISSUER);

      const db = firebase.firestore();
      db.collection('drivinglicense-demo-1').doc(docID).delete();
    } catch (error) {
      ApiService.alertWithBrowserConsole(error.message);
    }
  }

  return (
    <div className='tutorial'>
      <div className='tutorial__step'>
        <h3><strong>Application ID:</strong> {applicationID}</h3>
        <p><strong>Given Name:</strong> {givenName}</p>
        <p><strong>Family Name:</strong> {familyName}</p>
        <p><strong>Date of Issuance:</strong> {issueDate}</p>
        <p><strong>Issuer Organisation:</strong> {issuer}</p>
        <p><strong>Country of Issuance:</strong> {country}</p>
        <p><strong>Driving Class:</strong> {drivingClass}</p>
        <Button style={{display: 'block', margin: '10px 0 0 0'}}>View Proof of Document</Button>

        <Button style={{display: 'block', margin: '10px 0 0 0'}} onClick={approveVC}>Approve</Button>
        <Button style={{display: 'block', margin: '10px 0 0 0'}} disabled>Reject</Button>
      </div>
    </div>
  )
}

export default ApplicationInfoPage;