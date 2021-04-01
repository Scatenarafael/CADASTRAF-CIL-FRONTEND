export default function chDataReducer(
  state = {
    locCheck: true,
    endCheck: false,
    disabledEndInput: true,
    position: [-20.2759398, -50.2531764],
    clients: []
  }
  , action) {

  switch (action.type) {

    case 'LOC_DONE':
      return {
        locCheck: true,
        endCheck: false,
        disabledEndInput: true,
        position: [-20.2759398, -50.2531764],
        clients: []
      };

    case 'END_DONE':
      return {
        locCheck: false,
        endCheck: true,
        disabledEndInput: false,
        position: [-20.2759398, -50.2531764],
        clients: []
      };

    case 'GET_POSITION':
      return {
        locCheck: true,
        endCheck: false,
        disabledEndInput: true,
        position: action.payload,
        clients: []
      };

    case 'GET_GEOCODE_POSITION':
      return {
        locCheck: false,
        endCheck: true,
        disabledEndInput: false,
        position: action.payload,
        clients: []
      };

    case 'GET_ALL_CLIENT_DATA':
      return {
        locCheck: true,
        endCheck: false,
        disabledEndInput: true,
        position: [-20.2759398, -50.2531764],
        clients: action.clientData
      };

    default:
      return state
  }
}