import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/User/user-route";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//aplication route
app.use("/api/users", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to mongoose project!");
});

export default app;
