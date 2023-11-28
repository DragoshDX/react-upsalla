import { addMessage } from './notificationBar.js';
import { deleteContact } from './query.js';
import renderMessage from './message.js';

const stage = document.querySelector('.stage');

// delete contact
stage.addEventListener('click', (event) => {
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    !target.classList.contains('delete-friend')
  ) {
    return;
  }

  const button = target;
  const parent = button.parentElement;
  const contactId = parent.dataset.contactId;

  deleteContact(contactId);
  parent.remove();
  addMessage(renderMessage('Contact removed', 'danger'));
});

export default stage;
