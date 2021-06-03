import React from "react";

import {
  anyMatchingContact,
  httpOkResponse,
  mockHttpApi,
  renderApp,
} from "./testUtils";

describe("<App>", () => {

  it("render crucial components", async () => {
    jest.useFakeTimers();
    const httpApi = mockHttpApi();
    const tree = renderApp({ httpApi });
    expect(tree.searchPhraseInput()).toExist();
    expect(tree.contactDetails()).toExist();
    httpApi.getFirst5MatchingContacts.mockImplementation(
      () => httpOkResponse(
        [
          anyMatchingContact(),
        ],
      ),
    );
    tree.searchPhraseInput().changeValueTo("any name part");
    await tree.waitForHttp();
    expect(tree.matchingContacts()).toExist();
  });

});
