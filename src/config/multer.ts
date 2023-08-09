import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads/")
    },
    filename: function (req, file, callback) {
        const time =  Date.now()
        callback(null, `${time}_${file.originalname}` )
    }
})

export const upload = multer({ storage })