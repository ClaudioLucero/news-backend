// middlewares/checkApiKey.js
import { API_KEYS } from '../keys.js';

const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];  // Obtener la API Key del header

    if (!apiKey) {
        return res.status(401).json({ success: false, message: 'API Key is missing' });
    }

    if (!Object.values(API_KEYS).includes(apiKey)) {
        return res.status(403).json({ success: false, message: 'Invalid API Key' });
    }

    next();  // Si la API Key es válida, continuar con la solicitud
};

export default checkApiKey;
