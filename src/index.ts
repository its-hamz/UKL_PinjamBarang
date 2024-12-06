import Express from "express";
import userRoute from "./Router/userRoute";
import itemRoute from "./Router/itemRoute";
import borrowRoute from "./Router/borrowRoute";

const app = Express()

app.use(Express.json())

app.use(`/user`, userRoute)

app.use(`/item`, itemRoute)

app.use(`/borrow`, borrowRoute)

app.use(`/return`, borrowRoute)

app.use(`/analysis`, borrowRoute)


const PORT = 1992

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    
})