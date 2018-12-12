import getCircles from './getCircles';
import updateCircle from './updateCircle';

export default {
  namespaced: true,
  state: {
    ...getCircles.state,
    ...updateCircle.state
  },
  mutations: {
    ...getCircles.mutations,
    ...updateCircle.mutations
  },
  actions: {
    ...getCircles.actions,
    ...updateCircle.actions
  }
};
