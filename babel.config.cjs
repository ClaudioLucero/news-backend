module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current', // Especifica la versión de Node.js que estás utilizando
                },
            },
        ],
    ],
};
