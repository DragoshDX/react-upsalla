import { addMessage } from './notificationBar.js';
import { findContact } from './query.js';
import stage from './stage.js';
import renderMessage from './message.js';
import { pluralize } from './utils.js';

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
    const petsCount = contacts.reduce((petsCount, contact) => {
      const { pets = [] } = contact;
      petsCount += pets.length;

      return petsCount;
    }, 0);

    addMessage(
      renderMessage(
        `Found ${pluralize(contactsCount, {
          one: 'contact',
          many: 'contacts',
        })} with ${
          petsCount <= 0
            ? 'no pets'
            : pluralize(petsCount, {
                one: 'pet',
                many: 'pets',
              })
        }.`,
        'success',
      ),
    );
  }

  stage.innerHTML = '';
  stage.append(contacts);
  queryInput.value = '';
});

export default searchForm;
