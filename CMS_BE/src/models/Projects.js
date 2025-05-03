import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Account from './Accounts.js';

const Project = sequelize.define(
  'Project',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    description: DataTypes.TEXT,
    account_id: { type: DataTypes.INTEGER, allowNull: false },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    track: {
      type: DataTypes.ENUM('Planning', 'InProgress', 'Cancelled', 'Completed', 'Overdue'),
      allowNull: false,
      defaultValue: 'Planning',
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'Projects', timestamps: false }
);

(async () => {
  const { default: Account } = await import('./Accounts.js');
  Project.belongsTo(Account, { foreignKey: 'account_id', as: 'account' });
})();

export default Project;
