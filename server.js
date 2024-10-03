const express = require("express")
const app = express()
const cors=require("cors")
const bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", async (req, res) => {
    try {
        console.log()
        res.json("Working")

    } catch (error) {
        res.json(error)
    }
})
app.post("/store-details", async (req, res) => {
    try {
        const bodyData=req.body
        res.json({
            flag: true,
            outdata: {
                store_name: bodyData?.store_name,
                store_token: bodyData?.store_token,
            }
        })

    } catch (error) {
        res.json(error)
    }
})


app.post("/order-details", async(req,res) => {
    try {
        // console.log(req.body)
        const data = req.body;
        // console.log(data)
        const response = await fetch(`https://${data?.store_name}.myshopify.com/admin/api/2024-10/graphql.json`, {
            method: "POST",
            body: (data?.payload),
            headers: {
                'Content-Type': 'application/json',
                // 'X-Shopify-Access-Token': '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'
                'X-Shopify-Access-Token': `${data?.store_token}`
            },
        })
       const outdata = await response.json()
        res.json(outdata)

        
    } catch (error) {
        console.log(`${error}`)

        res.json(error)
    }
})


const PORT=process.env.PORT|| 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
