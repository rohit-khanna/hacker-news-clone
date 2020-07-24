import LinkButton from "./index";
import React from "react";
import { shallow } from "enzyme";

const renderLinkButton = (args) => {
  const defaultProps = {
    children: "some text",
    title: "",
    className: "",
    onClick: () => {},
  };
  const props = { ...defaultProps, ...args };
  return shallow(<LinkButton {...props} />);
};

describe("<LinkButton/>", () => {
  test("should  invoke the onClick handler", () => {
    const mockFn = jest.fn();
    const wrapper = renderLinkButton({ onClick: mockFn });
    const buttonEle = wrapper.find("button");
    buttonEle.simulate("click");
    expect(mockFn.mock.calls.length).toBe(1);
  });
});
