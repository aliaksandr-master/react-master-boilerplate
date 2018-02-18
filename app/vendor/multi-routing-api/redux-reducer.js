import merge from 'lodash/merge';
import clone from 'lodash/clone';
import { reduce } from 'multi-routing-api/lib/utils';



const DB_COLLECT_ENTITIES = '@DB_COLLECT_ENTITIES';
const DB_SET_ENTITIES = '@DB_SET_ENTITIES';



export const fetchEntitiesAction = (entities) => ({
  type: DB_COLLECT_ENTITIES,
  payload: { entities }
});

export const setEntitiesAction = (entities) => ({
  type: DB_SET_ENTITIES,
  payload: { entities }
});



export const reducer = (state = {}, action) => {
  if (action.type === DB_COLLECT_ENTITIES) {
    let fired = false;

    state = reduce(action.payload.entities, (state, entitiesById, entityName) => {
      if (!fired) { // small optimization
        fired = true;

        state = { ...state };
      }

      if (/^Keyword|AdGroup|SearchTerm|AdCampaign|AdAccount|NegativeKeyword|Application$/.test(entityName)) { // TODO: REMOVE THIS CONDITION WHEN BACKEND WILL RETURN ALL DATA EVERY TIME!
        state[entityName] = state[entityName] ? merge(state[entityName], entitiesById) : clone(entitiesById);
      } else {
        state[entityName] = {
          ...(state[entityName] || {}),
          ...entitiesById
        };
      }

      return state;
    }, state);
  }

  if (action.type === DB_SET_ENTITIES) {
    state = { ...action.payload.entities };
  }

  return state;
};
