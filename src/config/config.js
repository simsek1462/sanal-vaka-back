module.exports = {
    mongoURI: mongo.uri,
    secret: process.env.SECRET || 'svyst',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'svysrt',
    tokenLife: process.env.TOKEN_LIFE || '30d',
    refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || '7d'
}
