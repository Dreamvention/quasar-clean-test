import { Dialog } from 'quasar';
import CommonModal from 'src/components/common/Modal.vue';

export const openModal = async (data: {
  title: string;
  message: string;
  type: openModalTypes;
  confirm?: boolean;
  noBackdropDismiss?: boolean;
}): Promise<boolean> => {
  return await new Promise((resolve) =>
    Dialog.create({
      component: CommonModal,
      componentProps: data,
    })
      .onOk(() => resolve(true))
      .onCancel(() => resolve(false))
  );
};

export enum openModalTypes {
  Warning = 'warning',
  Info = 'info',
  Positive = 'positive',
  Negative = 'negative',
  Primary = 'primary',
}
