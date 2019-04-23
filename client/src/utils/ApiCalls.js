// front-end api calls
import axios from 'axios';

export default {
  getDrugNames: function(query) {
    console.log('query for drug name', query);
    return axios.post('/api/getDrug', query);
  },

  getDrugInteractions: function(query) {
    console.log('query for interactions booya!', query);
    return axios.post('/api/interaction', query);
  },

  getSavedSearches: function(query) {
    return axios.get('/api/savedSearches', query);
  }
};
