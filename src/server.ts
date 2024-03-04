import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import seedManager from './app/db';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    seedManager();
    app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
