import renderer from "react-test-renderer";
import React from "react";
import LinkButton from "./index";

describe("<LinkButton/>", () => {
  it("should match the snapshot", () => {
    const tree = renderer.create(
      <LinkButton className="someClass" title="Some title" onClick={() => {}}>
        some text
      </LinkButton>
    );
    expect(tree).toMatchSnapshot();
  });
});
