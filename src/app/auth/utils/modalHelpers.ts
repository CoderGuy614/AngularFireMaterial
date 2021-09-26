
export const closeModal = (modalId: string) => {
    console.log(modalId)
    var displayNameModalEl = document.querySelector(`#${modalId}`);
    var modalBackdrop = document.querySelector('.modal-backdrop');
    // var modal = Modal.getOrCreateInstance(displayNameModalEl);
    // modalBackdrop.remove();
    // modal.hide();
};