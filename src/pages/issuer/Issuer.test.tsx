// import React from 'react';
// import {act, fireEvent, render} from '@testing-library/react';
// import Issuer from 'pages/issuer/Issuer.tsx';
// import {MemoryRouter} from 'react-router-dom';
// import ApiService from 'utils/apiService';
// import userEvent from '@testing-library/user-event'
// import {unsignedDrivingLicenseVC} from 'utils/vc-data-examples/drivinglicense';
// import { VCBuildUnsignedOutput } from 'utils/apis';

// const getComponentElements = () => {
//   const {getByRole, getByText, getByLabelText} = render(<MemoryRouter><Issuer/></MemoryRouter>)

//   return {
//     givenNameField: getByLabelText('Given Name:'),
//     familyNameField: getByLabelText('Family Name:'),
//     dateOfIssuanceField: getByLabelText('Date of Issuance:'),
//     drivingLicenseIDField: getByLabelText('Driving License ID:'),
//     drivingClassDropDown: getByLabelText('Driving Class:'),
//     receiverDIDField: getByLabelText('Receiver DID:'),
//     clearButton: getByRole('button', {name: 'Clear all fields'}),
//     buildButton: getByRole('button', {name: 'Issue unsigned VC to another did'}),
//     signButton: getByRole('button', {name: 'Sign unsigned VC'}),
//     toggleButton: getByRole('button', {name: 'Toggle output display (Unsigned VC / Signed VC)'})
//   }
// }

// const givenName = 'Alex';
// const familyName = 'Tan';
// const dateofIssuance = '2019-09-09';
// const drivingLicenseID = '00000000';
// const receiverDID = '000000000'

// const unSignedVCOuput: VCBuildUnsignedOutput = {unsignedVC: unsignedDrivingLicenseVC};

// interface PropField {
//   field: HTMLElement,
//   value: string
// }

// interface Props {
//   username?: PropField,
//   password: PropField,
//   passwordConfirm: PropField,
//   termAndConditions?: HTMLElement
// }

// // const fillOutFields = (props: Props) => {
// //   if( props.username ) {
// //     fireEvent.change(props.username.field, {
// //       target: {
// //         value: props.username.value
// //       }
// //     })
// //   }

// //   fireEvent.change(props.password.field, {
// //     target: {
// //       value: props.password.value
// //     }
// //   })

// //   fireEvent.change(props.passwordConfirm.field, {
// //     target: {
// //       value: props.passwordConfirm.value
// //     }
// //   })

// //   if( props.termAndConditions ) {
// //     userEvent.click(props.termAndConditions)
// //   }
// // }

// // describe('User Signup component test', () => {
// //   test('Component renders', () => {
// //     const {
// //       usernameField,
// //       passwordField,
// //       passwordConfirmField,
// //       termsAndConditionsCheckbox,
// //       submitButton,
// //     } = getComponentElements();

// //     expect(usernameField).toBeInTheDocument()
// //     expect(passwordField).toBeInTheDocument()
// //     expect(passwordConfirmField).toBeInTheDocument()
// //     expect(termsAndConditionsCheckbox).toBeInTheDocument()
// //     expect(submitButton).toHaveAttribute('disabled')
// //   })

// //   test('Input fields and form validation', async () => {
// //     const {
// //       usernameField,
// //       passwordField,
// //       passwordConfirmField,
// //       termsAndConditionsCheckbox,
// //       submitButton,
// //     } = getComponentElements();

// //     // test with too short password
// //     act(() => {
// //       fillOutFields({
// //         username: {
// //           field: usernameField,
// //           value: username
// //         },
// //         password: {
// //           field: passwordField,
// //           value: shortPassword
// //         },
// //         passwordConfirm: {
// //           field: passwordConfirmField,
// //           value: shortPassword
// //         }
// //       })
// //     })

// //     expect(submitButton).toHaveAttribute('disabled')

// //     // update password to more than 6 characters
// //     act(() => {
// //       fillOutFields({
// //         password: {
// //           field: passwordField,
// //           value: password
// //         },
// //         passwordConfirm: {
// //           field: passwordConfirmField,
// //           value: confirmPassword
// //         }
// //       })
// //     })

// //     // test toggleCheckbox function
// //     act(() => {
// //       userEvent.click(termsAndConditionsCheckbox)
// //     })

// //     expect(submitButton).not.toHaveAttribute('disabled')
// //     expect(termsAndConditionsCheckbox).toBeChecked()

// //     act(() => {
// //       userEvent.click(termsAndConditionsCheckbox)
// //     })

// //     expect(submitButton).toHaveAttribute('disabled')
// //     expect(termsAndConditionsCheckbox).not.toBeChecked()
// //   })

// //   test('Form submit (pass)', async () => {const {
// //       usernameField,
// //       passwordField,
// //       passwordConfirmField,
// //       termsAndConditionsCheckbox,
// //       submitButton,
// //     } = getComponentElements();

// //     jest.spyOn(ApiService, 'signUp').mockReturnValue(Promise.resolve({
// //       accessToken: 'accessToken',
// //       did: 'did'
// //     }))

// //     jest.spyOn(ApiService, 'clientSideLogIn')

// //     act(() => {
// //       fillOutFields({
// //         username: {
// //           field: usernameField,
// //           value: username
// //         },
// //         password: {
// //           field: passwordField,
// //           value: password
// //         },
// //         passwordConfirm: {
// //           field: passwordConfirmField,
// //           value: confirmPassword
// //         },
// //         termAndConditions: termsAndConditionsCheckbox
// //       })
// //     })

// //     await act(async () => {
// //       await userEvent.click(submitButton)
// //     })

// //     expect(ApiService.signUp).toHaveBeenCalledTimes(1)
// //     expect(ApiService.clientSideLogIn).toHaveBeenCalledTimes(1)
// //   })

// //   test(`Form submit (fail, password and password confirm don't match)`, async () => {
// //     const {
// //       usernameField,
// //       passwordField,
// //       passwordConfirmField,
// //       termsAndConditionsCheckbox,
// //       submitButton,
// //     } = getComponentElements();

// //     jest.spyOn(window, 'alert').mockImplementation(() => {});

// //     act(() => {
// //       fillOutFields({
// //         username: {
// //           field: usernameField,
// //           value: username
// //         },
// //         password: {
// //           field: passwordField,
// //           value: password
// //         },
// //         passwordConfirm: {
// //           field: passwordConfirmField,
// //           value: confirmPasswordNotMatching
// //         },
// //         termAndConditions: termsAndConditionsCheckbox
// //       })
// //     })

// //     await act(async () => {
// //       await userEvent.click(submitButton)
// //     })

// //     expect(window.alert).toHaveBeenCalledWith(`Passwords don\'t match!`)
// //   })

// //   test(`Form submit (fail, ApiService.signUp returns Promise.reject)`, async () => {
// //     const {
// //       usernameField,
// //       passwordField,
// //       passwordConfirmField,
// //       termsAndConditionsCheckbox,
// //       submitButton,
// //     } = getComponentElements();

// //     jest.spyOn(window, 'alert').mockImplementation(() => {});
// //     jest.spyOn(ApiService, 'signUp').mockReturnValue(Promise.reject('No reason'))
// //     jest.spyOn(ApiService, 'alertWithBrowserConsole');

// //     act(() => {
// //       fillOutFields({
// //         username: {
// //           field: usernameField,
// //           value: username
// //         },
// //         password: {
// //           field: passwordField,
// //           value: password
// //         },
// //         passwordConfirm: {
// //           field: passwordConfirmField,
// //           value: confirmPassword
// //         },
// //         termAndConditions: termsAndConditionsCheckbox
// //       })
// //     })

// //     await act(async () => {
// //       await userEvent.click(submitButton)
// //     })

// //     expect(ApiService.alertWithBrowserConsole).toHaveBeenCalledTimes(1)
// //   })

// //   test(`Form submit (fail, invalid username)`, async () => {
// //     const {
// //       usernameField,
// //       passwordField,
// //       passwordConfirmField,
// //       termsAndConditionsCheckbox,
// //       submitButton,
// //     } = getComponentElements();

// //     jest.spyOn(window, 'alert').mockImplementation(() => {});
// //     jest.spyOn(ApiService, 'signUp').mockReturnValue(Promise.resolve())

// //     act(() => {
// //       fillOutFields({
// //         username: {
// //           field: usernameField,
// //           value: '+' + username
// //         },
// //         password: {
// //           field: passwordField,
// //           value: password
// //         },
// //         passwordConfirm: {
// //           field: passwordConfirmField,
// //           value: confirmPassword
// //         },
// //         termAndConditions: termsAndConditionsCheckbox
// //       })
// //     })

// //     await act(async () => {
// //       await userEvent.click(submitButton)
// //     })

// //     expect(window.alert).toHaveBeenCalledWith('Please provide a valid username (phone numbers and emails addresses are not allowed).')
// //   })
// // })

// describe('Issuance Component Test', () => {
//     test('Component renders successfully', () => {
//         const {
//             givenNameField,
//             familyNameField,
//             dateOfIssuanceField,
//             drivingLicenseIDField,
//             drivingClassDropDown,
//             receiverDIDField,
//             clearButton,
//             buildButton,
//             signButton,
//             toggleButton
//         } = getComponentElements()
        
//         expect(givenNameField).toBeInTheDocument();
//         expect(familyNameField).toBeInTheDocument();
//         expect(dateOfIssuanceField).toBeInTheDocument();
//         expect(drivingLicenseIDField).toBeInTheDocument();
//         expect(drivingClassDropDown).toBeInTheDocument();
//         expect(receiverDIDField).toBeInTheDocument();
//         expect(clearButton).toBeInTheDocument();
//         expect(buildButton).toBeInTheDocument();
//         expect(signButton).toBeInTheDocument();
//         expect(toggleButton).toBeInTheDocument();
//     })

//     test('Input fields and validation', async () => {
//       const {
//         givenNameField,
//         familyNameField,
//         dateOfIssuanceField,
//         drivingLicenseIDField,
//         drivingClassDropDown,
//         receiverDIDField,
//         buildButton,
//         signButton,
//         toggleButton
//       } = getComponentElements()

//       jest.spyOn(window, 'alert').mockImplementation(() => {});
//       jest.spyOn(ApiService, 'issueUnsignedVC').mockReturnValue(Promise.resolve(unSignedVCOuput))

//       fireEvent.change(givenNameField, { target: { value: givenName } })
//       fireEvent.change(familyNameField, { target: { value: familyName } })
//       fireEvent.change(dateOfIssuanceField, { target: { value: dateofIssuance } })
//       fireEvent.change(drivingLicenseIDField, { target: { value: drivingLicenseID } })
//       fireEvent.change(drivingClassDropDown, { target: { value: '3' } })
//       fireEvent.change(receiverDIDField, { target: { value: receiverDID } })

//       await act(async () => {
//         await userEvent.click(buildButton)
//       })

//       expect(window.alert).toHaveBeenCalledWith(`Unsigned VC successfully created.`)
//     })
// })