import { client } from "@/lib/storentiaClient";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const page = await client.pages.get(id);
    return Response.json(page || { pageTitle: "", content: "" });
  } catch (error) {
    console.error("Error fetching page:", error);
    return Response.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }
}
