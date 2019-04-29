// front-end api calls
import axios from 'axios';

export default {
  signInUser: function(userProfile) {
    return axios.post('/auth/signInUser', userProfile);
  },

  getDrugNames: function(query) {
    // console.log('query for medication name:', query);
    return axios.post('/api/getDrug', query);
  },

  getDrugInteractions: function(query) {
    // console.log('query for interactions:', query);
    return axios.post('/api/interaction', query);
  },

  getSavedSearches: function(query) {
    // console.log('query is', query);
    return axios.post('/api/savedSearches', query);
  }
};
