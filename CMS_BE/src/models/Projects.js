import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Account from './Accounts.js';

const Project = sequelize.define(
  'Project',
  {
    project_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    project_name: { type: DataTypes.TEXT, allowNull: false },
    description: DataTypes.TEXT,
    account_id: { type: DataTypes.INTEGER, allowNull: false },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    track: {
      type: DataTypes.ENUM('Planning', 'InProgress', 'OnHold', 'Cancelled', 'Completed', 'Overdue'),
      allowNull: false,
      defaultValue: 'Planning',
    },
    create_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    update_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'Projects', timestamps: false },
);

Project.belongsTo(Account, { foreignKey: 'account_id' });

export default Project;
