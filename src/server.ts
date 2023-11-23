import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

// Making connection to database
async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);

    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();
