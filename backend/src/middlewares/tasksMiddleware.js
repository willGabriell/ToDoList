const validateFieldTitle = (req, res, next) => {
    const {body} = req;
    if (body.titulo === undefined) {
        return res.status(400).json({mensage: 'the field "titulo" is required'})
    } else if (body.title === '') {
       return res.status(400).json({mensage: 'titulo cannot be empty'})
    }

    next();
};

const validateFieldStatus = (req, res, next) => {
    const {body} = req;
    if (body.status === undefined) {
        return res.status(400).json({mensage: 'the field "status" is required'})
    } else if (body.status === '') {
       return res.status(400).json({mensage: 'status cannot be empty'})
    }

    next();
};

module.exports = { 
    validateFieldTitle,
    validateFieldStatus
}