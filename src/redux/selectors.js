// export const getContacts = state => state.contacts.value;
// export const getFilter = state => state.filter.value;

export const getContacts = state => state.contacts.items;
export const getFilter = state => state.filter.value;
export const getLoading = state => state.contacts.isLoading;