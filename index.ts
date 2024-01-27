import { app } from "./app";

const port = process.env.PORT 

app.listen(port || 8000, ()=> {
    console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
})