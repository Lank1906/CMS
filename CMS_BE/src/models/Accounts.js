import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Project from './Projects.js';

const Account = sequelize.define(
  'Account',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    company: { type: DataTypes.STRING(100), allowNull: false },
    contact_person: { type: DataTypes.STRING(50), allowNull: false },
    email: { type: DataTypes.STRING(50), allowNull: false },
    phone: DataTypes.STRING(10),
    status: {
      type: DataTypes.ENUM('contract', 'pending', 'active', 'inactive'),
      defaultValue: 'contract',
    },
    url: DataTypes.STRING,
    address: DataTypes.TEXT,
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'Accounts', timestamps: false }
);

Account.hasMany(Project, { foreignKey: 'account_id', as: 'projects' });

export default Account;
