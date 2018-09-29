import getComplaints from './getComplaints';
import getComplaint from './getComplaint';

export default {
  namespaced: true,
  state: {
    ...getComplaints.state,
    ...getComplaint.state
  },
  mutations: {
    ...getComplaints.mutations,
    ...getComplaint.mutations
  },
  actions: {
    ...getComplaints.actions,
    ...getComplaint.actions
  }
};
