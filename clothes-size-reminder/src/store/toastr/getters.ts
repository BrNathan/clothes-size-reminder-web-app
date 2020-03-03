import { GetterTree } from 'vuex';
import { ToastrState, ToastrPriority } from './types';
import { RootState } from '../types';

declare interface IconPriority {
  priority: ToastrPriority;
  icon: string;
  color: string;
}

const iconList: IconPriority[] = [{
  priority: ToastrPriority.Info,
  icon: 'mdi-information',
  color: 'success',
}, {
  priority: ToastrPriority.Warning,
  icon: 'mdi-alert-circle',
  color: 'warning',
}, {
  priority: ToastrPriority.Error,
  icon: 'mdi-alert',
  color: 'error',
}];

const getters: GetterTree<ToastrState, RootState> = {
  getPriorityIcon(state: ToastrState): any {
    return (priority: ToastrPriority): string => {
      const icon: IconPriority | undefined = iconList.find(i => i.priority === priority);
      if (icon) {
        return icon.icon;
      }
      return '';
    };
  },
  getPriorityColor(state: ToastrState): any {
    return (priority: ToastrPriority): string => {
      const icon: IconPriority | undefined = iconList.find(i => i.priority === priority);
      if (icon) {
        return icon.color;
      }
      return '';
    };
  },
};

export default getters;
