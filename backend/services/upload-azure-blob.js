import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config({ path: '.env.local' });

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;

async function uploadToAzureBlob(file) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blobName = `${Date.now()}-${file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Upload file buffer to Azure Blob Storage
  await blockBlobClient.uploadData(file.buffer);

  // Return the URL of the uploaded image
  return blockBlobClient.url;
}

export default uploadToAzureBlob;
