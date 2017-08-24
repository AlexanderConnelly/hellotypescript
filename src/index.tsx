
require("index.scss");

import * as _ from "lodash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { RevealComponent } from "react-revealjs";
import "reveal.js";

/**
 * Base configuration, for now just the plugins we want to have onboard.
 */
const baseOptions: RevealOptions = {
    dependencies: [
        {
            condition: () => !!document.querySelector( "[data-markdown]" ),
            src: "plugin/markdown/marked.js",
        }, {
            condition: () => !!document.querySelector( "[data-markdown]" ),
            src: "plugin/markdown/markdown.js",
        }, {
            async: true,
            src: "plugin/notes/notes.js",
        }, {
            async: true,
            callback: () => hljs.initHighlightingOnLoad(),
            src: "plugin/highlight/highlight.js",
        },
    ],
};

// load the whole presentation, Webpack will embed it actually ...
const presentation = require("presentation.hjson");

_.assign(presentation.options, baseOptions);

ReactDOM.render(
    <div>
        <RevealComponent presentation={presentation}/>
    </div>,
    document.getElementById("app"),
);
