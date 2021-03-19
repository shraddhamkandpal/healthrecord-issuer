import React from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import ApiService from 'utils/apiService';
import { routes } from 'constants/routes';
import firebase from 'utils/firebase/firebase';

interface IProps {
  children?: React.ReactNode,
  location?: any
}

const ApplicationInfoPage: React.FC<IProps & RouteComponentProps> = (props: IProps): React.ReactElement => {
  const { username, payload, applicationID, docID, approved } = props.location.state.state;
  const holderID = payload.holder.id;
  const { givenName, familyName } = payload.credentialSubject.data;
  const { idClass, issueDate, issuer, documentType } = payload.credentialSubject.data.hasIDDocument.hasIDDocument;
  const { country, drivingClass } = JSON.parse(idClass)

  const history = useHistory();

  /**
   * Function for signing an unsigned VC.
  * */
  const approveVC = async () => {
    try {
      // sign the VC
      const {signedCredential} = await ApiService.signVC({
        unsignedCredential: payload
      })

      const db = firebase.firestore();
      
      // Store the information under Approved Table
      db.collection('drivinglicense-approved').add({ username, payload, applicationID, approved: true });

      // Store the information at the Holder's Table
      db.collection(`${holderID}`).add({documentType, signedCredential});

      // Delete the information under the Pending Approval Table
      db.collection('drivinglicense-waiting-approval').doc(docID).delete();

      alert('Unsigned VC has been approved and successfully signed.');
      history.push(routes.ISSUER);
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

        { !approved ? (
          <>
           <Button style={{display: 'block', margin: '10px 0 0 0'}} onClick={approveVC}>Approve</Button>
           <Button style={{display: 'block', margin: '10px 0 0 0'}} disabled>Reject</Button>
          </>
          ) : null}
       
      </div>
    </div>
  )
}

export default ApplicationInfoPage;