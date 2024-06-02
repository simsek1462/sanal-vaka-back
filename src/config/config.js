module.exports = {
    mongoURI: "mongodb+srv://simsek1462:beN9MbisKeveiErg@cluster0.orqwqbl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    secret: process.env.SECRET || 'svyst',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'svysrt',
    tokenLife: process.env.TOKEN_LIFE || '1m',
    refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || '7d'
}