import { MutationTree } from 'vuex';
import { ToastrState, ToastrPriority } from './types';


function displayToastrInternal(state: ToastrState) {
  state.isShown = true;
}

const mutations: MutationTree<ToastrState> = {
  displayToastr(state: ToastrState) {
    displayToastrInternal(state);
  },
  hideToastr(state: ToastrState) {
    state.isShown = false;
    state.messages = [];
  },
  displayErrorMessage(state: ToastrState, errorMessage: string) {
    state.messages.push({
      message: errorMessage,
      priority: ToastrPriority.Error,
    });

    if (!state.isShown) {
      displayToastrInternal(state);
    }
  },
  displayWarningMessage(state: ToastrState, warningMessage: string) {
    state.messages.push({
      message: warningMessage,
      priority: ToastrPriority.Warning,
    });

    if (!state.isShown) {
      displayToastrInternal(state);
    }
  },
  displayInfoMessage(state: ToastrState, infoMessage: string) {
    state.messages.push({
      message: infoMessage,
      priority: ToastrPriority.Info,
    });

    if (!state.isShown) {
      displayToastrInternal(state);
    }
  },
};


export default mutations;
