
import * as _ from "lodash";
import * as React from "react";
import "reveal.js";

const uid = _.uniqueId;

/**
 * One reveal.js section, which is just a definition for a single slide.
 */
export interface Section {
    id?: string;
    markdown?: string;
    markup?: string;
    notes?: string;
}

/**
 * Array of sections. One whole presentation is an array of sections, but the can
 * also nest, so we need to accept both.
 */
export type SectionArray = Array<Section|Section[]>;

/**
 * Whole presentation data, both the options for reveal.js plus all of the sections.
 */
export interface Presentation {
    options: RevealOptions;
    sections: SectionArray;
}

export interface Props {
    presentation: Presentation;
}

/**
 * Component to render sections for reveal.js, made out of presentation data. It also initialize
 * reveal.js, so it is usually used as a singleton instance.
 */
export class RevealComponent extends React.Component<Props, {}> {

    /**
     * Converts section data to JSX elements, ready for rendering.
     * @param {SectionArray} sections  The sections as defined in presentation data. Nesting will cause recursion.
     * @returns {JSX.Element[]}  The JSX elements, with random keys.
     */
    private static sectionsToSlides(sections: SectionArray): JSX.Element[] {
        const result: JSX.Element[] = [];
        for (const item of sections) {
            if (Array.isArray(item)) {
                result.push(
                    <section key={uid()}>
                        {RevealComponent.sectionsToSlides(item as SectionArray)}
                    </section>);
            } else {
                const section = item as Section;
                const notes = section.notes ? section.notes : null;
                if (section.markdown) {
                    result.push(
                        <section key={uid()} id={section.id} data-markdown="" data-notes={notes}>
                            <script type="text/template">
                                {section.markdown}
                            </script>
                        </section>);
                } else if (section.markup) {
                    result.push(
                        <section key={uid()} id={section.id} data-notes={notes}
                                 dangerouslySetInnerHTML={{__html: section.markup}}>
                        </section>);
                }
            }
        }

        return result;
    }

    constructor() {
        super();
    }

    public componentDidMount() {
        Reveal.initialize(this.props.presentation.options);
    }

    public render() {
        const slides = RevealComponent.sectionsToSlides(this.props.presentation.sections);
        return <div className="reveal">
            <div className="slides">
                {slides}
            </div>
        </div>;
    }
}
