import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Role = sequelize.define(
  'Role',
  {
    role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role_name: { type: DataTypes.STRING(20), allowNull: false },
    description: { type: DataTypes.TEXT },
    create_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    update_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'Roles', timestamps: false },
);

export default Role;
