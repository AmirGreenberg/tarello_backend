import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
const server = http.createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
            'http://localhost:5173'
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}

import { authRoutes } from './api/auth/auth.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { boardRoutes } from './api/board/board.routes.js'
import { setupSocketAPI } from './services/socket.service.js'

// routes
import { setupAsyncLocalStorage } from './middlewares/setupAls.middleware.js'
app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/board', boardRoutes)
setupSocketAPI(server)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})


import { logger } from './services/logger.service.js'
const port = process.env.PORT || 3030
server.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})




// import http from 'http'
// import path, { dirname } from 'path'
// import cors from 'cors'
// import express from 'express'
// import cookieParser from 'cookie-parser'


// const app = express()
// const server = http.createServer(app)

// // Express App Config
// app.use(cookieParser())
// app.use(express.json())
// app.use(express.static('public')) //////////////
// setupSocketAPI(server)

// if (process.env.NODE_ENV === 'production') {
//     // Express serve static files on production environment
//     app.use(express.static(path.resolve(__dirname, 'public')))
//     console.log('__dirname: ', __dirname)
// } else {
//     // Configuring CORS
//     const corsOptions = {
//         // Make sure origin contains the url your frontend is running on
//         origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:5174', 'http://localhost:5174', 'http://127.0.0.1:3031', 'http://localhost:3031'],
//         credentials: true
//     }
//     app.use(cors(corsOptions))
// }

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// import { authRoutes } from './api/auth/auth.routes.js'
// import { userRoutes } from './api/user/user.routes.js'
// import { boardRoutes } from './api/board/board.routes.js'
// import { setupSocketAPI } from './services/socket.service.js'
// import { fileURLToPath } from 'url'

// // routes


// import { setupAsyncLocalStorage } from './middlewares/setupAls.middleware.js'
// app.all('*', setupAsyncLocalStorage)

// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)
// app.use('/api/board', boardRoutes)

// app.get('/**', (req, res) => {
//     res.sendFile(path.resolve('public/index.html'))
// })


// import { logger } from './services/logger.service.js'
// logger.info('server.js loaded...')
// const port = process.env.PORT || 3031
// app.listen(port, () => {
//     logger.info('Server is running on port: ' + port)
// })