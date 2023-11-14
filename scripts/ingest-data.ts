import "dotenv/config";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { OpenAI } from "langchain/llms/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { MongoDBAtlasVectorSearch } from "langchain/vectorstores/mongodb_atlas";
import { MongoClient } from "mongodb";

/* Name of directory to retrieve your files from 
   Make sure to add your PDF files inside the 'docs' folder
*/
// const fileName = "IncomeTaxCorporationTaxExcemptions-part07.pdf";
const filePath =
  "data/legislation/notes_for_guidance_taxes_consolidation_act_1997_finance_act";

export const run = async () => {
  if (!process.env.MONGODB_ATLAS_URI) {
    throw new Error("MONGODB_ATLAS_URI must be set");
  }

  try {
    const client = new MongoClient(process.env.MONGODB_ATLAS_URI || "");
    let namespace =
      "EFChatBot.notes_for_guidance_taxes_consolidation_act_1997_finance_act";

    const [dbName, collectionName] = namespace.split(".");
    const collection = client.db(dbName).collection(collectionName);

    /*load raw docs from the all files in the directory */
    const directoryLoader = new DirectoryLoader(filePath, {
      ".pdf": (path) => new PDFLoader(path),
    });

    // const loader = new PDFLoader(filePath);
    const rawDocs = await directoryLoader.load();

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    // console.log("split docs", docs);

    console.log("creating vector store...");

    /* Initialize the LLM to use to answer the question */
    const model = new OpenAI({
      modelName: "gpt-3.5-turbo",
    });

    // const loader = new PDFLoader('./accountingLesson1.pdf')

    // const docs = await loader.load()
    const vectorStore = await MongoDBAtlasVectorSearch.fromDocuments(
      docs,
      new OpenAIEmbeddings(),
      {
        collection,
        indexName: "default", // The name of the Atlas search index. Defaults to "default"
        textKey: "text", // The name of the collection field containing the raw content. Defaults to "text"
        embeddingKey: "embedding", // The name of the collection field containing the embedded text. Defaults to "embedding"
      },
    );

    console.log("OpenAI:: vector store");

    // console.log(vectorStore);
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to ingest your data");
  }
};
(async () => {
  await run();
  console.log("ingestion complete");
})();
