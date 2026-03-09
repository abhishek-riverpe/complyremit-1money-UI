import apiClient from "@/lib/api-client";

export async function uploadFile(file: File, category: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);
  const res = await apiClient.post<{ objectKey: string }>("/storage/upload", formData);
  return res.data.objectKey;
}

export async function getDownloadUrl(objectKey: string) {
  const res = await apiClient.post<{ downloadUrl: string }>(
    "/storage/download-url",
    { objectKey }
  );
  return { download_url: res.data.downloadUrl };
}
