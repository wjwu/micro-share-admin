import addAdmin from './addAdmin';
import deleteAdmin from './deleteAdmin';
import getAdmins from './getAdmins';
import resetPassword from './resetPassword';

export default {
  namespaced: true,
  state: {
    ...addAdmin.state,
    ...deleteAdmin.state,
    ...getAdmins.state,
    ...resetPassword.state
  },
  mutations: {
    ...addAdmin.mutations,
    ...deleteAdmin.mutations,
    ...getAdmins.mutations,
    ...resetPassword.mutations
  },
  actions: {
    ...addAdmin.actions,
    ...deleteAdmin.actions,
    ...getAdmins.actions,
    ...resetPassword.actions
  }
};
