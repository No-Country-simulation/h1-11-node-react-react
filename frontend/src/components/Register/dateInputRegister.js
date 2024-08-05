
export const DateInputRegister = [
    [{
        placeholder: "Nombre",
        name: "name",
        type: "text",
        validate: {
            required: {
                value: true,
                message: 'El nombre es obligatorio.'
            },
            minLength: {
                value: 2,
                message: 'El nombre debe tener entre 2 y 50 letras'
            },
            maxLength: {
                value: 50,
                message: 'El nombre debe tener entre 2 y 50 letras'
            }
        }
    },
    {
        placeholder: "Apellido",
        name: "lastName",
        type: "text",
        validate: {
            required: {
                value: true,
                message: 'El apellido es obligatorio.'
            },
            minLength: {
                value: 2,
                message: 'El apellido debe tener entre 2 y 50 letras.'
            },
            maxLength: {
                value: 50,
                message: 'El apellido debe tener entre 2 y 50 letras.'
            }
        }
    }],
    [{
        placeholder: "Dirección",
        name: "address",
        type: "text",
        validate: {
            required: {
                value: true,
                message: 'La dirección es obligatorio.'
            },
            minLength: {
                value: 2,
                message: 'La dirección debe tener entre 2 y 50 letras.'
            },
            maxLength: {
                value: 50,
                message: 'La dirección debe tener entre 2 y 50 letras.'
            }
        }
    },
    {
        placeholder: "Correo Electrónico",
        name: "email",
        type: "email",
        validate: {
            required: {
                value: true,
                message: 'El correo electrónico es obligatorio.'
            },

        }
    }],
    [{
        placeholder: "Documento",
        name: "DNI",
        type: "number",
        validate: {
            required: {
                value: true,
                message: 'El numero de DNI es obligatorio.'
            },
        }
    },
    {
        placeholder: "Teléfono",
        name: "phone",
        type: "number",
        validate: {
            required: {
                value: true,
                message: 'El numero de teléfono es obligatorio.'
            },
        }
    }],
    [
        {
            placeholder: "Provincia",
            name: "province",
            type: "text",
            validate: {
                required: {
                    value: true,
                    message: 'La provincia es obligatorio.'
                },
                minLength: {
                    value: 2,
                    message: 'La provincia debe tener entre 2 y 50 letras.'
                },
                maxLength: {
                    value: 50,
                    message: 'La provincia debe tener entre 2 y 50 letras.'
                }
            }
        },
        {
            placeholder: "Localidad",
            name: "location",
            type: "text",
            validate: {
                required: {
                    value: true,
                    message: 'La Localidad es obligatorio.'
                },
                minLength: {
                    value: 2,
                    message: 'La Localidad debe tener entre 2 y 50 letras.'
                },
                maxLength: {
                    value: 50,
                    message: 'La Localidad debe tener entre 2 y 50 letras.'
                }
            }
        }],
    [
        {
            placeholder: "Sexo",
            name: "sex",
            type: "text",
            validate: {
                required: {
                    value: true,
                    message: 'El genero es obligatorio'
                },
            }
        },
        {
            placeholder: "Grupo sanguíneo",
            name: "bloodFactor",
            type: "text",
            validate: {
                required: {
                    value: true,
                    message: 'El factor es requerido'
                },
            }
        }],
];