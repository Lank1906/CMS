import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Role = sequelize.define(
  'Role',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(20), allowNull: false },
    description: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'Roles', timestamps: false },
);

export default Role;
