import { Modal } from 'bootstrap';

export const closeModal = (modalId: string) => {
    var displayNameModalEl = document.querySelector(`#${modalId}`);
    var modalBackdrop = document.querySelector('.modal-backdrop');
    var modal = Modal.getOrCreateInstance(displayNameModalEl);
    modal.hide();
    modalBackdrop.remove();
};