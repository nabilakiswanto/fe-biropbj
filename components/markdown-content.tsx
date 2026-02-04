import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Check if the content appears to be HTML (contains HTML tags)
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(content)

  if (isHtml) {
    // If it's HTML, render it directly
    return (
      <div
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-blue-600 prose-strong:font-bold"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  } else {
    // If it's markdown, render it with ReactMarkdown
    return (
      <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-blue-600 prose-strong:font-bold">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    )
  }
}
