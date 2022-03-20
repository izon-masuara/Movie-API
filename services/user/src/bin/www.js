import { app } from '../index.js'
import migrate from '../db/migration/migrate'
const port = process.env.PORT
const command = process.argv[2]

if (command === "migrate") {
  migrate()
}

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
