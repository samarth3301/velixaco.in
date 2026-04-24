import { client } from "@/lib/storentiaClient";

interface MediaItem {
  id: string;
  name: string;
  fileKey?: string;
}

export async function GET() {
  try {
    const media = await client.media.listMediaInFolder({
      folderId: "1c52bd8a-5ac3-4a75-bd96-69504bdda473",
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
