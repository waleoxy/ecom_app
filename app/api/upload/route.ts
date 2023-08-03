import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";
import { Form } from "multiparty";
import { IncomingMessage } from "http";
import { NextApiRequest } from "next";

const BUCKET_NAME = "nextecomwale";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const formDataEntryValues = Array.from(formData.values());
  // console.log("f1", formDataEntryValues.length);

  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY as string,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    },
  });
  const links = [];
  for (const formDataEntryValue of formDataEntryValues) {
    if (
      typeof formDataEntryValue === "object" &&
      "arrayBuffer" in formDataEntryValue
    ) {
      console.log("f1", formDataEntryValues);
      const file = formDataEntryValue as unknown as Blob;
      const buffer = Buffer.from(await file.arrayBuffer());
      console.log("f2", file);
      const newPathName = Date.now() + "." + file.name.split(".").pop();
      fs.writeFileSync(`public/${file.name}`, buffer);
      client.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: newPathName,
          Body: fs.readFileSync(`public/${file.name}`),
          ACL: "public-read",
          ContentType: mime.lookup(file.name) as string,
        })
      );
      //
      console.log(`public/${file.name}`);
      const link = `https://${BUCKET_NAME}.s3.amazonaws.com/${newPathName}`;
      links.push(link);
    }
  }
  return NextResponse.json({ links });
};
