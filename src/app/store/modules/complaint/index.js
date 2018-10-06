import getComplaints from './getComplaints';
import getComplaint from './getComplaint';
import updateComplaint from './updateComplaint';

export default {
  namespaced: true,
  state: {
    ...getComplaints.state,
    ...getComplaint.state,
    ...updateComplaint.state
  },
  mutations: {
    ...getComplaints.mutations,
    ...getComplaint.mutations,
    ...updateComplaint.mutations
  },
  actions: {
    ...getComplaints.actions,
    ...getComplaint.actions,
    ...updateComplaint.actions
  }
};
