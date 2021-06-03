import reducer from "./reducer";
import {
  selectMatchingContact,
  updateSearchPhraseFailure,
  updateSearchPhraseStart,
  updateSearchPhraseSuccess,
} from "./actions";
import { reduceWith } from "../../testUtils";

describe("Search reducer", () => {

  it("Search Phrase", () => {
    reduceWith(reducer)(
      updateSearchPhraseStart({ newPhrase: "new_something" }),
    ).check(state =>
      expect(state.phrase).toEqual("new_something"),
    ).reduce(
      updateSearchPhraseSuccess({ matchingContacts: [ "any matching contact" ] }),
    ).check(state =>
      expect(state.phrase).toEqual("new_something"),
    ).reduce(
      selectMatchingContact({ selectedMatchingContact: { value: "Someone" } }),
    ).check(state =>
      expect(state.phrase).toEqual("Someone"),
    );
  });

  it("Matching Contacts", () => {
    reduceWith(reducer)(
      updateSearchPhraseStart({ newPhrase: "new_something" }),
    ).check(state =>
      expect(state.matchingContacts).toEqual([]),
    ).reduce(
      updateSearchPhraseSuccess({ matchingContacts: [ { value: "Someone" } ] }),
    ).check(state =>
      expect(state.matchingContacts).toEqual([ { value: "Someone" } ]),
    ).reduce(
      selectMatchingContact({ selectedMatchingContact: { value: "Someone" } }),
    ).check(state =>
      expect(state.matchingContacts).toEqual([]),
    );
  });

  it("search failure", () => {
    reduceWith(reducer)(
      updateSearchPhraseStart({ newPhrase: "any phrase" }),
    ).check(state =>
      expect(state.searchFailure).toEqual(false),
    ).reduce(
      updateSearchPhraseFailure(),
    ).check(state =>
      expect(state.searchFailure).toEqual(true),
    );
  });

});
