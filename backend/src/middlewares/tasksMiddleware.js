const validateFieldTitle = (req, res, next) => {
    const {body} = req;
    if (body.title === undefined) {
        return res.status(400).json({mensage: 'the field "title" is required'})
    } else if (body.title === '') {
       return res.status(400).json({mensage: 'tittle cannot be empty'})
    }

    next();
};

const validateFieldStatus = (req, res, next) => {
    const {body} = req;
    if (body.status === undefined) {
        return res.status(400).json({mensage: 'the field "title" is required'})
    } else if (body.status === '') {
       return res.status(400).json({mensage: 'tittle cannot be empty'})
    }

    next();
};

module.exports = { 
    validateFieldTitle,
    validateFieldStatus
}