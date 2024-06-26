import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Role from '../models/role.js';

const User = sequelize.define('User', {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Role,
      key: '_id'
    }
  }
});

User.belongsTo(Role, { foreignKey: 'rol_id' });
Role.hasMany(User, { foreignKey: 'rol_id' });

export default User;
