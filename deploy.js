import * as dotenv from "dotenv"
dotenv.config({ path: "deploy.env" })

import * as fs from "node:fs"
import * as path from "node:path"
import * as mime from "mime-types"
import { S3, PutObjectCommand } from "@aws-sdk/client-s3"

/** @type {string} */
const SPACES_BUCKET_NAME = requireEnvVar("SPACES_BUCKET_NAME")
/** @type {string} */
const SPACES_REGION_NAME = requireEnvVar("SPACES_REGION_NAME")
/** @type {string} */
const SPACES_ENDPOINT_URL = requireEnvVar("SPACES_ENDPOINT_URL")
/** @type {string} */
const SPACES_ACCESS_KEY_ID = requireEnvVar("SPACES_ACCESS_KEY_ID")
/** @type {string} */
const SPACES_SECRET_KEY = requireEnvVar("SPACES_SECRET_KEY")

async function main() {
  // Verify that we have a build ready in the dist/ directory
  const distRoot = fs.statSync("dist")
  if (!distRoot.isDirectory()) {
    throw new Error("dist/ does not exist!")
  }

  // Initialize an S3 API client to run operations in DigitalOcean Spaces
  const s3 = new S3({
    forcePathStyle: false,
    endpoint: `https://${SPACES_ENDPOINT_URL}`,
    region: SPACES_REGION_NAME,
    credentials: {
      accessKeyId: SPACES_ACCESS_KEY_ID,
      secretAccessKey: SPACES_SECRET_KEY,
    },
  })

  // Upload each file from dist to the bucket, recursively
  console.log(`Deploying new build from dist/ to bucket '${SPACES_BUCKET_NAME}'...`)
  for (const relpath of collectFiles("dist")) {
    const localFilePath = path.join("dist", relpath)
    const remoteObjectKey = relpath.replace("\\", "/")
    const contentType = mime.lookup(remoteObjectKey.slice(remoteObjectKey.lastIndexOf("/") + 1))
    console.log(`Uploading '${remoteObjectKey}' with content-type '${contentType}' from ${localFilePath}...`)

    const fileStream = fs.createReadStream(localFilePath)
    try {
      await s3.send(new PutObjectCommand({
        Bucket: SPACES_BUCKET_NAME,
        Key: remoteObjectKey,
        ACL: "public-read",
        Body: fileStream,
        ContentType: contentType,
      }))
    } finally {
      fileStream.close()
    }
  }
  console.log("Deployed to: https://goldenvcr.com/graphics")
}

/**
* Resolves a required environment variable value, throwing an Error if not set.
* @param {string} name Name of the value to check in process.env.
* @returns {string}
*/
function requireEnvVar(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Required environment variable '${name}' is not defined`)
  }
  return value
}

/**
 * Walks the given directory recursively and returns an array containing the relative
 * paths of all files encountered.
 * @param {string} root Root directory from which files should be uploaded.
 * @returns {string[]}
 */
function collectFiles(root) {
  /**
   * @param {string} topDirPath
   * @param {string} parentPath
   * @param {string[]} outPaths 
   */
  function aux(topDirPath, parentPath, outPaths) {
    for (const name of fs.readdirSync(topDirPath)) {
      const abspath = path.join(topDirPath, name)
      const relpath = parentPath === "" ? name : path.join(parentPath, name)
      if (fs.statSync(abspath).isDirectory()) {
        aux(abspath, relpath, outPaths)
      } else {
        outPaths.push(relpath)
      }
    }
  }
  /** @type {string[]} */
  const paths = []
  aux(root, "", paths)
  return paths
}

main().then(() => {})
