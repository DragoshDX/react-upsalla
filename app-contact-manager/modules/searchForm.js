import { addMessage } from './notificationBar.js';
import { findContact } from './query.js';
import stage from './stage.js';
import renderMessage from './message.js';

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const queryInput = form.q;
  const searchValue = queryInput.value;

  const contacts = findContact(searchValue);
  const contactsCount = contacts.length;

  if (contactsCount <= 0) {
    addMessage(renderMessage('No contacts found', 'warning'));
  } else {
    addMessage(renderMessage(`${contactsCount} contacts found`, 'success'));
  }

  stage.innerHTML = '';
  stage.append(contacts);
  queryInput.value = '';
});

export default searchForm;
