import ReactMarkdown from "react-markdown";
import type { Article } from "@/lib/types";

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
      <header className="mb-4 sm:mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          {article.title}
        </h1>
        <div className="text-gray-600 border-b pb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <time
                dateTime={article.publishDate}
                className="text-sm sm:text-base"
              >
                {new Date(article.publishDate).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="text-sm text-gray-500">記者：田中 太郎</span>
            </div>
            <div className="flex space-x-2 text-sm">
              <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs sm:text-sm">
                地域
              </span>
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs sm:text-sm">
                行政
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="text-gray-800 leading-relaxed">
        <ReactMarkdown
          components={{
            h2: ({ node, ...props }) => (
              <h2
                className="text-2xl font-bold text-black underline decoration-yellow-500 decoration-2 mb-4 mt-6"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="text-xl font-semibold text-black underline decoration-yellow-500 decoration-2 mb-3 mt-5"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="text-gray-800 leading-relaxed mb-4" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul
                className="list-disc list-inside mb-4 space-y-1 ml-4"
                {...props}
              />
            ),
            li: ({ node, ...props }) => (
              <li className="text-gray-800" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-semibold" {...props} />
            ),
            img: ({ node, ...props }) => (
              <img
                className="w-full max-w-3xl mx-auto rounded-lg shadow-md my-6 sm:my-8 block"
                {...props}
              />
            ),
            em: ({ node, ...props }) => (
              <span
                className="block text-sm text-gray-600 text-center mt-2 mb-6 italic"
                {...props}
              />
            ),
          }}
        >
          {article.content}
        </ReactMarkdown>
      </div>

      {article.imageUrl && (
        <div className="my-8">
          <img
            src={article.imageUrl}
            alt="記事の画像"
            className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
          />
        </div>
      )}
    </article>
  );
}
