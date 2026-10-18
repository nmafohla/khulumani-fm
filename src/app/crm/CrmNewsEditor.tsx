"use client";

import { Plus } from "lucide-react";
import type { NewsArticle } from "@/types/radio";

export function NewsSectionEditor({
  news,
  onChange,
}: {
  readonly news: readonly NewsArticle[];
  readonly onChange: (next: readonly NewsArticle[]) => void;
}) {
  const updateArticle = (index: number, patch: Partial<NewsArticle>) => {
    onChange(
      news.map((item, idx) => (idx === index ? { ...item, ...patch } : item))
    );
  };

  const addArticle = () => {
    const newItem: NewsArticle = {
      id: `bulletin-${Date.now()}`,
      slug: `bulletin-${Date.now()}`,
      title: "New Montrose Studio Bulletin",
      category: "Station Announcement",
      date: "October 18, 2026",
      author: "Montrose News Desk",
      image: "/images/post-1.jpg",
      excerpt: "Breaking update from Khulumani FM 95.0 in Bulawayo.",
      content:
        "Tune in live on 95.0 FM or stream online at khulumani.hakili.online for full coverage from Montrose Studios.",
    };
    onChange([newItem, ...news]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-khulumani-ink">
          Newsroom &amp; Community Bulletins ({news.length})
        </h2>
        <button
          type="button"
          onClick={addArticle}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-khulumani-green text-white text-xs font-extrabold hover:bg-khulumani-greenDark"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add News Bulletin</span>
        </button>
      </div>

      <div className="space-y-4 max-h-[540px] overflow-y-auto pr-1">
        {news.map((article, idx) => (
          <div
            key={article.id}
            className="p-4 rounded-2xl bg-khulumani-bg/70 border border-khulumani-border space-y-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <label
                  htmlFor={`news-title-${article.id}`}
                  className="block text-[10px] font-bold uppercase text-khulumani-muted mb-0.5"
                >
                  Headline
                </label>
                <input
                  id={`news-title-${article.id}`}
                  name={`newsTitle_${article.id}`}
                  type="text"
                  value={article.title}
                  onChange={(e) =>
                    updateArticle(idx, { title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white border border-khulumani-border text-xs font-bold text-khulumani-ink"
                />
              </div>

              <div>
                <label
                  htmlFor={`news-cat-${article.id}`}
                  className="block text-[10px] font-bold uppercase text-khulumani-muted mb-0.5"
                >
                  Category
                </label>
                <input
                  id={`news-cat-${article.id}`}
                  name={`newsCategory_${article.id}`}
                  type="text"
                  value={article.category}
                  onChange={(e) =>
                    updateArticle(idx, { category: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white border border-khulumani-border text-xs text-khulumani-ink"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor={`news-excerpt-${article.id}`}
                className="block text-[10px] font-bold uppercase text-khulumani-muted mb-0.5"
              >
                Summary Excerpt
              </label>
              <textarea
                id={`news-excerpt-${article.id}`}
                name={`newsExcerpt_${article.id}`}
                rows={2}
                value={article.excerpt}
                onChange={(e) =>
                  updateArticle(idx, { excerpt: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-white border border-khulumani-border text-xs text-khulumani-ink"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
