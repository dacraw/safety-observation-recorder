import { create } from "zustand";

export type ModalName = "navigation";

export type ModalState = {
  modalVisibility: {
    [key in ModalName]: boolean;
  };
  toggleModal: (modalName: string, isVisible: boolean) => void;
};

const useModalStore = create<ModalState>((set) => ({
  modalVisibility: {
    navigation: false,
  },
  toggleModal: (modalName, isVisible) => {
    set((state) => ({
      modalVisibility: {
        ...state.modalVisibility,
        [modalName]: isVisible,
      },
    }));
  },
}));

export default useModalStore;
