import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Role from './Roles.js';

const User = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
    full_name: { type: DataTypes.STRING(50), allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false },
    email: { type: DataTypes.STRING(50), allowNull: false },
    phone: { type: DataTypes.STRING(15), allowNull: false },
    address: { type: DataTypes.STRING(100), allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'Users', timestamps: false }
);

User.belongsTo(Role, { foreignKey: 'role_id' });

export default User;
