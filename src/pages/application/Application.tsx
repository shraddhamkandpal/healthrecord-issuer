import React, { useState, useContext } from 'react';
import AppContext from 'context/app';
import {Button, FormControl, FormGroup, FormLabel, FormFile} from 'react-bootstrap';
import ApiService from 'utils/apiService';
import 'pages/application/Application.scss'
import firebase from 'utils/firebase/firebase';
import randomstring from 'randomstring';

interface IBaseVCData {
    givenName: string;
    familyName: string;
    issueDate: string;
  }
  
  interface IExtendVCData {
    drivingLicenseID: string;
    country: string;
    drivingClass: string;
    email: string;
    issuerOrganization: string;
  }
  
  const defaultBaseVCData: IBaseVCData = {
    givenName: '',
    familyName: '',
    issueDate: ''
  }
  
  const defaultExtendVCData: IExtendVCData = {
    drivingLicenseID: '',
    country: 'Singapore',
    drivingClass: '1',
    email: '',
    issuerOrganization: 'Automobile Association of Singapore'
  }

interface IPayload extends IBaseVCData{
  idClass: string;
  holderDid: string
}

const Application: React.FC = (): React.ReactElement => {
    const {appState} = useContext(AppContext);
    const [inputDID, setinputDID] = useState(appState.didToken || '')

    const [baseVCData, setBaseVCData] = useState<IBaseVCData>(defaultBaseVCData)
  
    const [extendVCData, setExtendVCData] = useState<IExtendVCData>(defaultExtendVCData)

    /**
     * Function for issuing an unsigned employment VC.
     * */
    const issueDrivingLicensePersonVC = async () => {
        try {
          const { givenName, familyName, issueDate } = baseVCData;

          // Generate a random Affinidi Driving License ID, which will double up as an application ID
          const applicationID: string = randomstring.generate(10);
          const vcToStringify = {...extendVCData, affinidiDrivingLicenseID: applicationID}
          
          const payload: IPayload = {
            givenName,
            familyName,
            issueDate,
            idClass: JSON.stringify(vcToStringify),
            holderDid: inputDID || appState.didToken || '',
          }

          // Store unsignedVC into issuer's datsabase
          const db = firebase.firestore();
          db.collection('drivinglicense-waiting-approval').add({username: appState.username, payload, applicationID, approved: false})

          alert('You have successfully submitted your application.');
        } catch (error) {
            ApiService.alertWithBrowserConsole(error.message);
        }
    }
    
    const resetToDefaults = () => {
      setinputDID(appState.didToken || '')

      setBaseVCData(defaultBaseVCData)
      setExtendVCData(defaultExtendVCData)
    }
    
    const updateBaseVC = (e: any) => {
      setBaseVCData({...baseVCData, [e.target.name]: e.target.value})
    }

    const updateExtendBaseVC = (e: any) => {
      setExtendVCData({...extendVCData, [e.target.name]: e.target.value})
    }

    return (
      <div className='tutorial'>
        <div className='tutorial__step'>
          <Button 
            style={{float: 'right'}}
            onClick={e => resetToDefaults()}
            >Clear all fields
          </Button>

          <p><strong>Step 1:</strong>Please fill in details of your driving license</p>
          <FormGroup controlId='email'>
            <FormLabel className='label' style={{margin: '10px 0 0 0'}}>Email Address:</FormLabel>
            <FormControl name='email' type='text' value={extendVCData.email} onChange={e => updateExtendBaseVC(e)}/>
          </FormGroup>

          <FormGroup controlId='givenName'>
            <FormLabel className='label' style={{margin: '10px 0 0 0'}}>Given Name:</FormLabel>
            <FormControl name='givenName' type='text' value={baseVCData.givenName} onChange={e => updateBaseVC(e)}/>
          </FormGroup>

          <FormGroup controlId='familyName'>
            <FormLabel style={{margin: '10px 0 0 0'}}>Family Name:</FormLabel>
            <FormControl name='familyName' type='text' value={baseVCData.familyName} onChange={e => updateBaseVC(e)}/>
          </FormGroup>

          <FormGroup controlId='issueDate'>
            <FormLabel style={{margin: '10px 0 0 0'}}>Date of Issuance:</FormLabel>
            <FormControl name='issueDate' type='text' value={baseVCData.issueDate} onChange={e => updateBaseVC(e)}/>
          </FormGroup>

          <FormGroup controlId='drivingLicense'>
            <FormLabel style={{margin: '10px 0 0 0'}}>Driving License ID:</FormLabel>
            <FormControl name='drivingLicenseID' type='text' value={extendVCData.drivingLicenseID} onChange={e => updateExtendBaseVC(e)}/>
          </FormGroup>

          <FormGroup controlId='drivingClass'>
            <FormLabel style={{margin: '10px 0 0 0'}}>Driving Class:</FormLabel>
            <FormControl name='drivingClass' as="select" value={extendVCData.drivingClass} onChange={e => updateExtendBaseVC(e)}>
              <option>1</option>
              <option>2</option>
              <option>2A</option>
              <option>2B</option>
              <option>3</option>
              <option>3A</option>
              <option>3C</option>
              <option>3CA</option>
              <option>4</option>
              <option>4A</option>
              <option>5</option>
            </FormControl>
          </FormGroup>

          <div style={{margin: '30px 0'}}>
            <p><strong>Step 2:</strong>Upload Proof of Driving License</p>
            <FormFile id="formcheck-api-regular">
              <FormFile.Label>Proof of Driving License</FormFile.Label>
              <FormFile.Input />
            </FormFile>
          </div>
          
          <Button 
            onClick={e => issueDrivingLicensePersonVC()}
            >Submit
          </Button>
        </div>
      </div>
    )
}

export default Application;