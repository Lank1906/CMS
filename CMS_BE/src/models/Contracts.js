import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Project from './Projects.js';

const Contract = sequelize.define(
  'Contract',
  {
    contract_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(100), allowNull: false },
    project_id: { type: DataTypes.INTEGER, allowNull: false },
    sign_date: DataTypes.DATE,
    total_amount: DataTypes.FLOAT,
    working_days: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM(
        'Draft',
        'WaitingForApproval',
        'Signed',
        'InEffect',
        'Terminated',
        'Expired',
        'Cancelled',
      ),
      allowNull: false,
      defaultValue: 'Draft',
    },
    create_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    update_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'Contracts', timestamps: false },
);

Contract.belongsTo(Project, { foreignKey: 'project_id' });

export default Contract;
