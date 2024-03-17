import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ "message": "No file found" });
    }

    const byteData = await file.arrayBuffer();
    const buffer=Buffer.from(byteData);
    const path = `./public/images/${file.name}`;

    await writeFile(path, Buffer.from(buffer));

    return NextResponse.json({ "message": "File uploaded", success: true });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.error(new Error("Internal server error"));
  }
}

// // direct database store
// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import uniqid from "uniqid";

// export async function POST(req) {
//   try {
//     const formData = await req.formData();

//     if (formData.has("file")) {
//       const file = formData.get("file");

//       const s3Client = new S3Client({
//         region: "us-east-1",
//         credentials: {
//           accessKeyId: process.env.S3_ACCESS_KEY,
//           secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//         },
//       });

//       const randomId = uniqid();
//       const ext = file.name.split(".").pop();
//       const newFilename = randomId + "." + ext;
//       const bucketName = process.env.BUCKET_NAME;

//       const chunks = [];
//       for await (const chunk of file.stream()) {
//         chunks.push(chunk);
//       }

//       await s3Client.send(
//         new PutObjectCommand({
//           Bucket: bucketName,
//           Key: newFilename,
//           ACL: "public-read",
//           Body: Buffer.concat(chunks),
//           ContentType: file.type,
//         })
//       );

//       const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;

//       // Return the link to the uploaded file
//       return { link };
//     } else {
//       return new Response("No file provided", { status: 400 });
//     }
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }
