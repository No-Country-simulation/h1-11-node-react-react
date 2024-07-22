export const DateInputRegister = [
    {
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

    }
]