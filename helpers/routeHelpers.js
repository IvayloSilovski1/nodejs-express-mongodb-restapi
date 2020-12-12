const Joi = require('joi');




module.exports = {

    validateParams: (schema, name) => {
        return (req, res, next) => {
            console.log('req.params in validateParams', req.params);
            console.log(`req['params'][name]`, req['params'][name])

            const result = schema.validate({ param: req['params'][name] });
            console.log(`result`, result);

            if (result.error) {
                // handle error
                return res.status(400).json(result.error);
            } else {
                console.log('param ID passed validation')
                    // handle if no error
                if (!req.value) req.value = {};

                if (!req.value['params']) req.value['params'] = {};

                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.body);
            console.log(`result in validateBody`, result)

            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                console.log(`validated body successfully!`)
                if (!req.value) req.value = {};
                if (!req.value['body']) req.value['body'] = {};

                req.value['body'] = result.value;
                next();
            }
        }
    },

    schemas: {
        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).alphanum().trim().required()
        }),

        userSchema: Joi.object().keys({
            firstname: Joi.string().alphanum().trim().required(),
            lastname: Joi.string().alphanum().trim().required(),
            email: Joi.string().email().trim().required()
        }),

        userOptionalSchema: Joi.object().keys({
            firstname: Joi.string().alphanum().trim(),
            lastname: Joi.string().alphanum().trim(),
            email: Joi.string().email().trim()
        }),

        carSchema: Joi.object().keys({
            make: Joi.string().alphanum().trim().required(),
            model: Joi.string().trim().required(),
            year: Joi.number().integer().min(1860).max(2022).required()
        })
    }
}