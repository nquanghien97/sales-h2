import { writeFile, unlink } from 'fs/promises';
import path from 'path';

export async function uploadFile(files: File[]) {
  const promises = files.map(async (file) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");

    const targetPath = path.join(process.cwd(), `files`);
    await writeFile(
      path.join(targetPath, filename),
      buffer
    );
    const type  = ['image', 'audio', 'video'].includes(file.type.split('/')[0]) ? file.type.split('/')[0] : 'other';
    return {
      filename: `/files/${filename}`,
      type,
      fileName: file.name
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