import { writeFile, unlink } from 'fs/promises';
import path from 'path';

export async function uploadFile(files: File[], folderPath: string) {
  const promises = files.map(async (file) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");

    const targetPath = path.join(process.cwd(), `files/${folderPath}`);
    await writeFile(
      path.join(targetPath, filename),
      buffer
    );
    const type = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : file.type.startsWith('application/pdf') ? 'pdf' : '' as unknown as 'video' | 'image' | 'pdf';
    return {
      filename: `/files/${folderPath}/${filename}`,
      type,
      imageName: file.name
    }
  });

  const filenames = await Promise.all(promises);
  return filenames;
}

export async function deleteFile(filename: string) {
  // Xóa tệp ảnh khỏi hệ thống file
  const filePath = path.join(process.cwd(), filename);
  try {
    await unlink(filePath);
  } catch(err) {
    console.log(err)
  }
}