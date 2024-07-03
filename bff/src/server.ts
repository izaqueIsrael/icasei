// src/server.ts
import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`BFF running on port ${PORT}`);
});
