
import * as React from "react";
import { Presentation, RevealComponent } from "react-revealjs";
import * as ReactTestRenderer from "react-test-renderer";

const TEST_PRESENTATION: Presentation = {
    options: {
        controls: true,
    },
    sections: [
        {
            id: "test-1",
            markdown: "this is marked `down`",
        },
    ],
};

// FIXME: not sure yet on how to activate reveal.js global thing when running in test renderer ...

test.skip("simple presentation should render properly", async () => {
    const rendered = ReactTestRenderer.create(
        <RevealComponent presentation={TEST_PRESENTATION}/>);
    expect(rendered).toMatchSnapshot();
});
