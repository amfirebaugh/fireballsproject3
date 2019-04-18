// import React, { Component } from 'react';

// export default class Private extends Component {
//   state = {
//     message: ''
//   };

// componentDidMount() {
//     fetch('/users', {
//         url: 'http://fireb.auth0.com/api/vs/users-by-email',
//         qs: { email: 'USER_EMAIL_ADDRESS' },
//         headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error('Network response was not ok.');
//             }
//         })
//         .then(response => this.setState({ message: response.message }))
//         .catch(error => this.setState({ message: error.message }));
// }

// render() {
//     return (
//         <div>
//             <p>{this.state.message}</p>
//         </div>
//     );
// }
//}
