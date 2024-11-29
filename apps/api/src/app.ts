import express, {Request, Response} from "express"

const app = express()
const PORT = 4321

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hello world from express.js!');
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
})

                     