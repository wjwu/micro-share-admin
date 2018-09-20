import getPositions from './getPositions';
import delPosition from './delPosition';
import addPosition from './addPosition';
import addRelation from './addRelation';
import addAd from './addAd';
import updateAd from './updateAd';
import updatePosition from './updatePosition';
import getPosition from './getPosition';
import getAds from './getAds';
import delAd from './delAd';
import getAd from './getAd';
import getRelationAds from './getRelationAds';
import getUnRelationAds from './getUnRelationAds';
import getTargets from './getTargets';

export default {
  namespaced: true,
  state: {
    ...getPositions.state,
    ...delPosition.state,
    ...addPosition.state,
    ...addRelation.state,
    ...addAd.state,
    ...updateAd.state,
    ...updatePosition.state,
    ...getPosition.state,
    ...getAds.state,
    ...delAd.state,
    ...getAd.state,
    ...getRelationAds.state,
    ...getUnRelationAds.state,
    ...getTargets.state
  },
  mutations: {
    ...getPositions.mutations,
    ...delPosition.mutations,
    ...addPosition.mutations,
    ...addRelation.mutations,
    ...addAd.mutations,
    ...updateAd.mutations,
    ...updatePosition.mutations,
    ...getPosition.mutations,
    ...getAds.mutations,
    ...delAd.mutations,
    ...getAd.mutations,
    ...getRelationAds.mutations,
    ...getUnRelationAds.mutations,
    ...getTargets.mutations
  },
  actions: {
    ...getPositions.actions,
    ...delPosition.actions,
    ...addPosition.actions,
    ...addRelation.actions,
    ...addAd.actions,
    ...updateAd.actions,
    ...updatePosition.actions,
    ...getPosition.actions,
    ...getAds.actions,
    ...delAd.actions,
    ...getAd.actions,
    ...getRelationAds.actions,
    ...getUnRelationAds.actions,
    ...getTargets.actions
  }
};
