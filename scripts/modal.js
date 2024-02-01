export const modal = {
  click() {    
    if (modalOverlay.classList.contains('active')) {
      modalOverlay.classList.remove('active');
      clearTable();
      members();
    } else {
      modalOverlay.classList.add('active');
    }
  },
};

