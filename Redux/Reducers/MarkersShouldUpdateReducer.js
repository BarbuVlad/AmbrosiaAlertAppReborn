import {MARKERS_SHOULD_UPDATE} from '../Actions/Types';

let initialState={incrementToUpdateMarkers:0}

export let markersShouldUpdateReducer = (state = initialState, action)=>{
    switch (action.type){
      case MARKERS_SHOULD_UPDATE:
        return {...state, incrementToUpdateMarkers: state.incrementToUpdateMarkers +1}

      default:
        return state
    }

}
