import fs from "fs";
import csv from "csv-parser";

import "dotenv/config";
import {supabaseServer} from "../config/supabase.js";

const CSV_PATH = "./sample-data/products.csv";

const BATCH_SIZE = 5000;

let batch = [];
let totalImported = 0;

async function insertBatch(records) {
  if (!records.length) return;

  const { error } = await supabaseServer
    .from("products")
    .upsert(records, {
      onConflict: "product_code"
    });

  if (error) {
    console.error("Batch Insert Failed:", error);
    throw error;
  }

  totalImported += records.length;

  console.log(
    `Imported: ${totalImported} records`
  );
}

async function processCSV() {
  return new Promise((resolve, reject) => {
    const stream = fs
      .createReadStream(CSV_PATH)
      .pipe(csv());

    stream.on("data", async (row) => {
      stream.pause();

      batch.push({
        product_code: row.product_code,
        name: row.name,
        category: row.category,
        price: Number(row.price),
        created_at: row.created_at,
        updated_at: row.updated_at
      });

      if (batch.length >= BATCH_SIZE) {
        const currentBatch = [...batch];
        batch = [];

        try {
          await insertBatch(currentBatch);
        } catch (err) {
          reject(err);
          return;
        }
      }

      stream.resume();
    });

    stream.on("end", async () => {
      try {
        if (batch.length) {
          await insertBatch(batch);
        }

        console.log(
          `Finished importing ${totalImported} records`
        );

        resolve();
      } catch (err) {
        reject(err);
      }
    });

    stream.on("error", reject);
  });
}

processCSV()
  .then(() => {
    console.log("Import Complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });