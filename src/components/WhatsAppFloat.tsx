"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { WHATSAPP_URL, getWhatsAppUrl } from "@/lib/data";

export default function WhatsAppFloat() {
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Show bubble after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setShowBubble(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowBubble(false);
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2">
      {/* Chat Bubble */}
      {showBubble && (
        <div className="relative bg-white rounded-2xl rounded-br-sm shadow-2xl p-4 max-w-[220px] border border-green-100 animate-in slide-in-from-bottom-2 fade-in duration-300">
          <button
            onClick={dismiss}
            className="absolute -top-2 -right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
          >
            <X className="w-3 h-3 text-gray-500" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-pine-forest rounded-full flex items-center justify-center text-sm flex-shrink-0">🏔️</div>
            <div>
              <p className="text-xs font-bold text-pine-forest leading-tight">Mukhtar Ahmed Abbasi</p>
              <p className="text-xs text-green-500 font-medium">● Online</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Assalam o Alaikum! 👋 Interested in a Fairy Meadows flat? Chat with me directly for prices & availability!
          </p>
          <a
            href={getWhatsAppUrl("Assalam o Alaikum Mukhtar bhai! I'm interested in the Fairy Meadows Project flats in Murree. Can you help me?")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 flex items-center justify-center gap-1.5 bg-green-500 text-white text-xs font-bold py-2 rounded-xl hover:bg-green-600 transition-colors w-full"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Start Chat →
          </a>
          {/* Triangle */}
          <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-8 border-r-0 border-t-8 border-l-transparent border-t-white drop-shadow-sm" />
        </div>
      )}

      {/* Main FAB Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 group"
        aria-label="Chat on WhatsApp with Mukhtar Ahmed Abbasi"
        onClick={() => setShowBubble(false)}
      >
        {/* WhatsApp SVG icon */}
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="text-sm font-bold whitespace-nowrap">
          WhatsApp Us
        </span>
        {/* Live pulse dot */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-400 border-2 border-white" />
        </span>
      </a>
    </div>
  );
}
