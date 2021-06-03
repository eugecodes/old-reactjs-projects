import React from "react";

import { mount } from "enzyme";

import PhraseInput from "./PhraseInput";

const renderPhraseInput = (propsOverrides) =>
  mount(
    <PhraseInput
      phrase=""
      onPhraseChange={() => {}}
      downshiftGetInputProps={(props) => props}
      {...propsOverrides}
    />,
  );

describe("<PhraseInput>", () => {

  it("render provided phrase", async () => {
    const tree = renderPhraseInput({
      phrase: "something",
    });
    expect(tree.find("input")).toHaveValue("something");
  });

  it("pass typed phrase to callback", async () => {
    const onPhraseChangeMock = jest.fn();
    const tree = renderPhraseInput({
      onPhraseChange: onPhraseChangeMock,
    });
    tree.simulate("change", { target: { value: "something!" } });
    expect(onPhraseChangeMock).toHaveBeenCalledWith("something!");
  });

});
