// import React from 'react';
// import {act, fireEvent, render} from '@testing-library/react';
// import User from 'pages/user/User';
// import {MemoryRouter} from 'react-router-dom';
// import userEvent from '@testing-library/user-event';

// describe('User Page test', () => {
//   test('Page renders with login', () => {
//     const {getByText} = render(<MemoryRouter><User/></MemoryRouter>)

//     const title = getByText('Login');
//     const info1 = getByText('Login in order to continue.')
//     const smallInfo = getByText('Don\'t have an account?')
//     const signUpButton = getByText('Sign up here')
    
//     expect(title).toBeInTheDocument()
//     expect(info1).toBeInTheDocument()
//     expect(smallInfo).toBeInTheDocument()
//     expect(signUpButton).toBeInTheDocument()
//   })

//   test('Page renders with signup', () => {
//     const {getByText} = render(<MemoryRouter><User/></MemoryRouter>)

//     const signUpButton = getByText('Sign up here')
//     userEvent.click(signUpButton)

//     const title = getByText('Create account');
//     const info1 = getByText('Welcome to your personal wallet. Here you will be able to store, view and manage your digital identity.')
//     const info2 = getByText('In order to access your wallet you will need to set up a password first')
    
//     expect(title).toBeInTheDocument()
//     expect(info1).toBeInTheDocument()
//     expect(info2).toBeInTheDocument()
//   })

//   test('Page renders login, goes to signup back to login', () => {
//     const {getByText} = render(<MemoryRouter><User/></MemoryRouter>)

//     const signUpButton = getByText('Sign up here')
//     userEvent.click(signUpButton)

//     const loginButton = getByText('Log in here')
//     userEvent.click(loginButton)

//     const title = getByText('Login');
//     expect(title).toBeInTheDocument()
//   })
// })
