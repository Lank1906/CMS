import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import bcrypt from 'bcryptjs';
const Role = sequelize.define('Role', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role_name: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
  },
  create_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  update_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false, 
  createdAt: 'create_at',
  updatedAt: 'update_at'
});

export default Role;
