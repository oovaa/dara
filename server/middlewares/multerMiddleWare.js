import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('uploads'))
    },
    filename:  (req, file, cb) => {
        const uniqueSuffix = uuidv4()
        cb(null, uniqueSuffix + '-' + file.originalname)
    },
    fileFilter: (req, file, cb) => {
        const allowedFiles = ['pptx', 'pdf', 'docx', 'txt']
        if (allowedFiles.includes(file.mimetype.split("/")[1])) {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})

const upload = multer({ 
    storage,
}).single('file')

export default  upload 