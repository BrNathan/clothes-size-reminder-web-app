import { Mutation } from 'vuex-class';
import { Vue } from 'vue-property-decorator';
import { STORE_TOASTR } from '@/store/namespace';

export default class BaseComponent extends Vue {
  @Mutation('displayErrorMessage', { namespace: STORE_TOASTR })
  displayErrorMessage!: (message: string) => void;

  @Mutation('displayInfoMessage', { namespace: STORE_TOASTR })
  displayInfoMessage!: (message: string) => void;

  @Mutation('displayWarningMessage', { namespace: STORE_TOASTR })
  displayWarningMessage!: (message: string) => void;
}
