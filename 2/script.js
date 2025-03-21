import React from "https://esm.sh/react@16";
import ReactDOM from "https://esm.sh/react-dom@16";

marked.setOptions({
  breaks: true,
});

const { useState, useEffect } = React;

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState(`
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '~~~' && lastLine == '~~~') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
  `);

  useEffect(() => {
    const editor = document.getElementById("editor");
    editor.value = markdown;
  }, [markdown]);

  const handleChange = (e) => {
    // Replace carriage returns with newlines
    const formattedMarkdown = e.target.value.replace(/\r/g, "\n");
    setMarkdown(formattedMarkdown);
  };

  return (
    <div id="app">
      <textarea
        id="editor"
        className="editor"
        value={markdown}
        onChange={handleChange}
        placeholder="Enter markdown"
      />
      <div
        id="preview"
        className="preview"
        dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
      />
    </div>
  );
};

// Render the component
ReactDOM.render(<MarkdownPreviewer />, document.getElementById("app"));
