"use client";

import Script from "next/script";

declare global {
  interface Window {
    VK?: {
      Widgets: {
        Post: (
          elementId: string,
          ownerId: number,
          postId: number,
          hash: string
        ) => void;
      };
    };
  }
}

const WIDGET_ID = "vk_post_-230456786_6";
const OWNER_ID = -230456786;
const POST_ID = 6;
const HASH = "zXiZ95VXiZQECSgi-BXYJtlkpAkt";

function renderWidget() {
  window.VK?.Widgets.Post(WIDGET_ID, OWNER_ID, POST_ID, HASH);
}

export default function VkVideoEmbed() {
  return (
    <div className="mx-auto w-full max-w-xl overflow-x-auto">
      <Script
        src="https://vk.com/js/api/openapi.js?173"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div id={WIDGET_ID} />
    </div>
  );
}
