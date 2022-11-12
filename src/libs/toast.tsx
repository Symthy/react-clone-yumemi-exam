import toast, { Toast as BaseToast } from 'react-hot-toast';
import { ApiClientError } from 'src/api/error';
import { ApiClientErrorToast } from 'src/concerns/toast/api-client-error-toast';

export type Toast = BaseToast;

export const onCustomToaster = (err: ApiClientError) => {
  toast((t) => <ApiClientErrorToast err={err} onCloseToast={() => toast.dismiss(t.id)} />, { duration: Infinity });
};
