import { client } from "@/lib/storentiaClient";

interface MediaItem {
  id: string;
  name: string;
  fileKey?: string;
}

export async function GET() {
  try {
    const media = await client.media.listMediaInFolder({
      folderId: "dd8e7c52-0cb2-45a8-b4ce-bef468c8c853",
    });

    const images = (media || []).map((item: MediaItem) => ({
      id: item.id,
      name: item.name,
      url: item.fileKey,
    }));

    return Response.json(images);
  } catch (error) {
    console.error("Error fetching hero images:", error);
    return Response.json([], { status: 500 });
  }
}
