import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function OverviewPage() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/docs/01_overview.md")
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  return (
    <div className="px-4 sm:px-6">
      <div className="py-6 text-white max-w-prose mx-auto">
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
              const codeString = String(children).replace(/\n$/, "");
              const match = /language-(\w+)/.exec(className || "");

              if (inline || !match) {
                return (
                  <code className="bg-gray-800 p-1 rounded text-sm" {...props}>
                    {children}
                  </code>
                );
              }

              const handleCopy = () => {
                navigator.clipboard.writeText(codeString);
              };

              return (
                <div className="relative">
                  <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 bg-gray-700 text-xs px-2 py-1 rounded hover:bg-gray-600 transition"
                  >
                    Copy
                  </button>
                  <SyntaxHighlighter
                    language={match[1]}
                    style={oneDark}
                    PreTag="div"
                    customStyle={{
                      borderRadius: "0.5rem",
                      padding: "1em",
                      background: "#282c34",
                    }}
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
