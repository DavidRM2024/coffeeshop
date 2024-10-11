/*
import { DataTypes } from 'sequelize';
import { conn } from './connection'; // Importa tu instancia de Sequelize

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users', // Nombre de la tabla en la base de datos
    timestamps: true, // Si deseas que Sequelize gestione createdAt y updatedAt
});

// Sincroniza el modelo con la base de datos
(async () => {
    await sequelize.sync(); // Crea la tabla si no existe
})();

export default User;
*/