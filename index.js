const express = require(`express`);
const app = express();
const PORT = 8001;
const cors = require(`cors`);
app.use(cors());
const userRoute = require(`./routes/user.routes`);
app.use(`/user`, userRoute);
app.listen(PORT, () => {
  console.log(`Server of Wikusama Hotel runs on port
${PORT}`);
});
