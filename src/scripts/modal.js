import { clearTable } from'./table.js'
import { members } from'./index.js'

export const modal = {
  click() {   
    const modalOverlay = document.querySelector('.modal-overlay'); 
    if (modalOverlay.classList.contains('active')) {
      modalOverlay.classList.remove('active');
      clearTable();
      members();
    } else {
      modalOverlay.classList.add('active');
    }
  },
};

