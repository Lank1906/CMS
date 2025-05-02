import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Contract from './Contracts.js';
import User from './Users.js';
import ContractRole from './ContractRoles.js';

const ContractStaff = sequelize.define(
  'ContractStaff',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contract_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    contract_role_id: { type: DataTypes.INTEGER, allowNull: false },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'ContractStaffs', timestamps: false }
);

ContractStaff.belongsTo(Contract, { foreignKey: 'contract_id' });
ContractStaff.belongsTo(User, { foreignKey: 'user_id' });
ContractStaff.belongsTo(ContractRole, { foreignKey: 'contract_role_id' });

export default ContractStaff;
