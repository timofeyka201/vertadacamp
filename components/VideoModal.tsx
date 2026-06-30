"use client";

import Modal from "./Modal";
import VkVideoEmbed from "./VkVideoEmbed";
import { useSite } from "./SiteContext";

export default function VideoModal() {
  const { videoOpen, closeVideo } = useSite();

  return (
    <Modal open={videoOpen} onClose={closeVideo} maxWidth="max-w-xl">
      <div className="p-6 pb-2 text-center">
        <p className="font-heading text-lg font-semibold text-forest-dark">
          VertadaCamp изнутри и снаружи
        </p>
        <p className="mt-1 text-sm text-graphite/70">
          Кухня, спальное место, электрика и сцепное устройство — в деталях.
        </p>
      </div>
      <div className="p-6 pt-4">
        {videoOpen && <VkVideoEmbed />}
      </div>
    </Modal>
  );
}
