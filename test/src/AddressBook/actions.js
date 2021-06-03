import { actions as searchActions } from "./SearchContacts";
import { actions as contactDetailsActions } from "./ContactDetails";

export const updateSearchPhrase = ({newPhrase}) =>
  (dispatch, getState, { httpApi }) => {
	  console.log("newPhrase " + newPhrase);
    dispatch(
      searchActions.updateSearchPhraseStart({ newPhrase }),
    );
	
    httpApi.getFirst5MatchingContacts({ namePart: newPhrase })
      .then(({ data }) => {
		  	  console.log("newPhrase data " + data);
        const matchingContacts = data.map(contact => ({
          id: contact.id,
          value: contact.name,
        }));

        dispatch(
          searchActions.updateSearchPhraseSuccess({ matchingContacts }),
        );
      })
      .catch(() => {

      });
  };

export const selectMatchingContact = selectedMatchingContact =>
  (dispatch, getState, { httpApi, dataCache }) => {
    const getContactDetails = ({ id }) => {
      return httpApi
          .getContact({ contactId: selectedMatchingContact.id })
          .then(({ data }) => ({
            id: data.id,
            name: data.name,
            phone: data.phone,
            addressLines: data.addressLines,
          }));
    };

    dispatch(
      searchActions.selectMatchingContact({ selectedMatchingContact }),
    );

    dispatch(
      contactDetailsActions.fetchContactDetailsStart(),
    );

    getContactDetails({ id: selectedMatchingContact.id })
      .then((contactDetails) => {
        dataCache.store({
          key: contactDetails.id,
        });
        dispatch(
          contactDetailsActions.fetchContactDetailsFailure(),
        );
      })
      .catch(() => {
        dispatch(
          contactDetailsActions.fetchContactDetailsFailure(),
        );
      });
  };
