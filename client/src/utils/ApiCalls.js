// front-end api calls
import axios from 'axios';

export default {
  // getUsers
  signInUser: function(userProfile) {
    return axios.post('/api/signInUser', userProfile);
  },

  // saveUserInfo

  getDrugNames: function(query) {
    console.log('query for drug name', query);
    return axios.post('/api/getDrug', query);
  },

  getDrugInteractions: function(query) {
    console.log('query for interactions booya!', query);
    return axios.post('/api/interaction', query);
  }
};

// componentDidMount() {
//   fetch('/users', {
//     url: 'http://fireb.auth0.com/api/vs/users-by-email',
//     qs: { email: 'USER_EMAIL_ADDRESS' },
//     headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
//   })
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error('Network response was not ok.');
//       }
//     })
//     .then(response => this.setState({ message: response.message }))
//     .catch(error => this.setState({ message: error.message }));
// }

// render() {
//   return (
//     <div>
//       <p>{this.state.message}</p>
//     </div>
//   );
// }
