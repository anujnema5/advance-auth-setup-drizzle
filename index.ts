import { app } from "./app";

const port = process.env.PORT 

app.listen(port || 800, ()=> {
    console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
})