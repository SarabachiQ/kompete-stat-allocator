// src/components/MarkdownRenderer.jsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function MarkdownRenderer({ content }) {
  return (
    <div className="prose prose-invert max-w-none px-4 py-6 mx-auto bg-gray-900 text-white rounded-xl">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            return !inline ? (
              <pre className="bg-gray-800 rounded p-4 overflow-x-auto text-sm">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-gray-700 px-1 rounded">{children}</code>
            );
          },
        }}
      />
    </div>
  );
}
