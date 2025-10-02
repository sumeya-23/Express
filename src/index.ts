import express from "express";
import taskRoutes from './router/tasks';

const app = express();
const port = 3000;
app.use(express.json());

app.use("/api/tasks", taskRoutes);


app.listen(port, (error) => {
  if(error){
 return console.error("error starting server", error)
  }else{
  console.log(`Server running on http://localhost:${port}`);
  }
});

