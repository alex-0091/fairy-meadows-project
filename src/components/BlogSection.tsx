"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Calendar } from "lucide-react";
import { BLOGS } from "@/lib/data";

export default function BlogSection() {
  const [selectedBlog, setSelectedBlog] = useState<typeof BLOGS[0] | null>(null);

  return (
    <section id="blog" className="py-20 bg-pine-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-terracotta text-sm font-semibold tracking-widest uppercase mb-3">
            Stories from the Hills
          </span>
          <h2 className="font-fraunces text-4xl md:text-5xl text-warm-sand font-bold mb-4">
            Life Above the Clouds
          </h2>
          <p className="text-warm-sand/60 text-lg max-w-2xl mx-auto">
            Real stories and insights about mountain living, investment wisdom,
            and the magic of Murree's pine hills.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOGS.map((blog, index) => (
            <div
              key={blog.slug}
              className={`group cursor-pointer ${
                index === 0 ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""
              }`}
              onClick={() => setSelectedBlog(blog)}
            >
              <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full">
                <div className={`relative ${index === 0 ? "h-56 md:h-72" : "h-44"} overflow-hidden`}>
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pine-forest/70 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-warm-sand/40 text-xs mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>Mountain Life</span>
                  </div>
                  <h3 className={`font-fraunces font-bold text-warm-sand mb-2 leading-tight ${
                    index === 0 ? "text-xl md:text-2xl" : "text-base"
                  }`}>
                    {blog.title}
                  </h3>
                  <p className="text-warm-sand/60 text-sm line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <button className="mt-3 text-terracotta hover:text-orange-400 text-xs font-semibold transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedBlog(null)}
          />
          <div className="relative bg-warm-sand rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 z-10 bg-pine-forest/80 hover:bg-pine-forest rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="relative h-56">
              <Image
                src={selectedBlog.image}
                alt={selectedBlog.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-forest/60 to-transparent" />
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 text-moss-slate/50 text-xs mb-3">
                <Calendar className="w-3 h-3" />
                <span>Mountain Life · Murree Stories</span>
              </div>
              <h2 className="font-fraunces text-2xl md:text-3xl font-bold text-pine-forest mb-4">
                {selectedBlog.title}
              </h2>
              <div className="text-moss-slate/80 leading-relaxed text-sm prose prose-sm max-w-none">
                {selectedBlog.content.trim().split('\n').map((line, i) => {
                  if (line.startsWith('# ')) return <h1 key={i} className="font-fraunces text-2xl font-bold text-pine-forest mt-6 mb-3">{line.slice(2)}</h1>;
                  if (line.startsWith('## ')) return <h2 key={i} className="font-fraunces text-xl font-bold text-pine-forest mt-5 mb-2">{line.slice(3)}</h2>;
                  if (line.startsWith('- ')) return <li key={i} className="ml-4 mb-1">{line.slice(2)}</li>;
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i} className="mb-3">{line}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
