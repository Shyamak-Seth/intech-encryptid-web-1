require("dotenv").config()

const express = require("express"),
    cookieParser = require("cookie-parser"),
    path = require("path"),
    app = express(),
    PORT = process.env.PORT || 3000

app.use(cookieParser())
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json({limit: "1mb"}))

app.get("/do-you-believe-in-reincarnation", (req, res) => {
    res.cookie("encrypted_password", "aURvQmVsaWV2ZUluUmVpbmNhcm5hdDFvbiMzOT8hPw==", {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true
    })
    res.sendFile(path.join(__dirname, "public", "do-you-believe-in-reincarnation.html"))
})

app.post("/do-you-believe-in-reincarnation", (req, res) => {
    const {password} = req.body
    if (!password) {
        return res.end("nope")
    }
    if (password !== "iDoBelieveInReincarnat1on#39?!?") {
        return res.end("Wrong password! I KNEW YOU COULDN'T DO IT")
    } else {
        res.sendFile(path.join(__dirname, "flag.html"))
    }
})

app.listen(PORT, console.log(`Server listening on port ${PORT}`))
