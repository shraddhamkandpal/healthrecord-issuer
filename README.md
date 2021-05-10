# Affinidi Use Case Implementation - Health Record - Issuer

## Table of contents

- [Introduction](#introduction)
- [Initial Set Up](#how-to-setup)

  - [Generate Affinidi API Key](#generate-api-key)
  - [Amazon SES Credentials](#amazon-ses)
  - [Firebase Credentials](#firebase)
  - [Amazon S3 Credentials](#amazon-s3)
  - [Configure .env File](#configure-.env-file)

- [How to run](#how-to-run)
  - [Sequence](#sequence)

## Introduction

Welcome to Health Wallet Use Case - Issuer application. In this application, you will experience how does a health record issuer would issue a prescription  and thereafter how a Issuer checks the information and issues a verified health record to the applicant.

## Initial Set Up

### Generate API Key

Before you could use our API and SDK services, you would have to register to get the API keys.

1. Go to apikey.affinidi.com
2. Register for an account
3. Store the `API Key` and `API Key Hash` safely

### Amazon SES

In our Issuer application, once the issuer has approved an application, the applicant will receive the credentials through their email. Hence, we will be using Amazon SES services.

1. Go to AWS Console https://console.aws.amazon.com/
2. Click on your username near the top right and select My Security Credentials
3. Under `Access keys for CLI, SDK & API access`, click `Create access key`
4. Store the `Access key ID` and `Secret access key` safely

### Firebase

Note: This step will be optional.

In our issuer application, we will be using firebase to mimic issuer's database which stores all of the applications.

1. Go to Firebase Console https://console.firebase.google.com/
2. Create a new Firestore
3. Navigation to Project Settings
4. Look for `firebaseConfig` and copy the credentials. It should look like

```
  var firebaseConfig = {
    apiKey: <<SOME API KEY>>,
    authDomain: "<<SOMEP PROJECT NAME>>.firebaseapp.com",
    projectId: "<<SOMEP PROJECT NAME>>",
    storageBucket: "<<SOMEP PROJECT NAME>>.appspot.com",
    messagingSenderId: <<SOME STRING>>,
    appId: <<SOME STRING>>
  };
```

### Configure .env file

1. Open terminal and navigate to the project folder
2. Run `cp .env.example .env`
3. Fill in the .env file with the details that you have gathered in the previous steps

```
REACT_APP_API_KEY=<<Afffinidi's API Key>>
REACT_APP_API_KEY_HASH=<<Affinidi's API Key Hash>>
REACT_APP_ENVIRONMENT=prod
REACT_APP_WALLET_URL=<<URL OF THE WALLET APPLICATION>>

REACT_APP_AWS_ACCESS_KEY_ID=<<AWS's Access Key ID>>
REACT_APP_AWS_SECRET_ACCESS_KEY=<<AWS's Secret access key>>

REACT_APP_FIREBASE_API_KEY=<<Firebase's apiKey>>
REACT_APP_FIREBASE_AUTHDOMAIN=<<Firebase's authDomain>>
REACT_APP_FIREBASE_PROJECT_ID=<<Firebase's projectId>>
REACT_APP_FIREBASE_STORAGEBUCKET=<<Firebase's storageBucket>>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<<Firebase's messagingSenderId>>
REACT_APP_FIREBASE_APP_ID=<<Firebase's appId>>

REACT_APP_AWS_S3_BUCKET=<<AWS S3 bucket name>>
REACT_APP_AWS_S3_REGION=<<AWS S3 region>>
REACT_APP_AWS_S3_KEY=<<AWS S3 key>>
REACT_APP_AWS_S3_SECRET=<<AWS S3 secret>>
```

## How to run

1. Open terminal and navigate to the project folder
2. Run `npm install`
3. Run `cp .env.example .env`
4. Populate the credentials in `.env`
5. Run `npm start`

### Sequence

Run Issuer, Holder and Verifier in this sequence in your local machine.
