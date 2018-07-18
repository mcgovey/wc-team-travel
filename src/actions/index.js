export function clickMap(feature) {
  return {
    type: 'CLICK_MAP',
    payload: feature
  }
}

export function setStyle(style) {
  return {
    type: 'SET_STYLE',
    payload: style
  }
}

export function changeViz(event) {
  return {
    type: 'CHANGE_VIZ',
    payload: event.value
  }
}

export function panMap(viewport) {
  return {
    type: 'PAN_MAP',
    payload: viewport
  }
}

export function selectGame(e) {
  return {
    type: 'SELECT_GAME',
    payload: e.currentTarget.dataset.id
  }
}

export function selectGameArc(e) {
  return {
    type: 'SELECT_GAME',
    payload: e.object.datePlayed
  }
}
