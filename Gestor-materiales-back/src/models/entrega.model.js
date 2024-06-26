import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './users.model.js';
import Material from './material.model.js';

const Entrega = sequelize.define('Entrega', {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  usuario_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: '_id'
    }
  },
  material_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Material,
      key: '_id'
    }
  },
  fecha_entrega: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: { 
    type: DataTypes.ENUM('pendiente', 'completado', 'cancelado'), 
    allowNull: false,
    defaultValue: 'pendiente'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Entrega.belongsTo(User, { foreignKey: 'usuario_id' });
Entrega.belongsTo(Material, { foreignKey: 'material_id' });
User.hasMany(Entrega, { foreignKey: 'usuario_id' });
Material.hasMany(Entrega, { foreignKey: 'material_id' });

export default Entrega;
