import contacts from './data.js';

export const findContact = (needle = 'query') => {
  const results = contacts.filter((contact) => {
    // [1, 'Carol', 'Carolson', '073', ... , []]
    const values = Object.values(contact).filter((part) => {
      return typeof part === 'number' || typeof part === 'string';
    });

    needle = needle.toLowerCase();

    if (values.join('').toLowerCase().includes(needle)) {
      return true;
    }

    return false;
  });

  return results;
};
