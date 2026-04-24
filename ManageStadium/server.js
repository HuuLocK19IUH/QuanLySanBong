import App from "./src/api/App.js";
import connectDB from "./src/api/config/db.js";

const PORT = 5000;

connectDB();

App.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});