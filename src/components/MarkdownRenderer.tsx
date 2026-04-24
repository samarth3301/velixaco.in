import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  return (
    <div className={cn('prose prose-invert max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: (props) => (
            <h1 className="font-outfit text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6" {...props} />
          ),
          h2: (props) => (
            <h2 className="font-outfit text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 mt-8" {...props} />
          ),
          h3: (props) => (
            <h3 className="font-outfit text-3xl font-bold tracking-tight mb-3 mt-6" {...props} />
          ),
          h4: (props) => (
            <h4 className="font-outfit text-2xl font-bold tracking-tight mb-2 mt-4" {...props} />
          ),
          p: (props) => (
            <p className="text-lg leading-relaxed mb-4 font-medium" {...props} />
          ),
          ul: (props) => (
            <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
          ),
          ol: (props) => (
            <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
          ),
          li: (props) => (
            <li className="text-lg leading-relaxed font-medium" {...props} />
          ),
          code: (props: any) =>
            props.inline ? (
              <code className="bg-white/10 px-2 py-1 rounded font-mono text-sm" {...props} />
            ) : (
              <code className="block bg-white/5 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4" {...props} />
            ),
          blockquote: (props) => (
            <blockquote className="border-l-4 border-white/20 pl-4 italic text-white/70 my-4" {...props} />
          ),
          a: (props) => (
            <a className="text-blue-400 hover:text-blue-300 underline" {...props} />
          ),
          img: ({ alt, ...props }) => (
            <img alt={alt || 'Image'} className="max-w-full h-auto rounded-lg my-4" {...props} />
          ),
          table: (props) => (
            <table className="w-full border-collapse border border-white/20 my-4" {...props} />
          ),
          th: (props) => (
            <th className="border border-white/20 bg-white/10 p-2 text-left" {...props} />
          ),
          td: (props) => (
            <td className="border border-white/20 p-2" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
