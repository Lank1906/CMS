import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Role from './role.js';  
import bcrypt from 'bcryptjs';
const User = sequelize.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'role_id'
    },
    allowNull: false
  },
  user_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.CHAR(10),
  },
  address: {
    type: DataTypes.STRING(100),
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
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
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);  
  user.password = await bcrypt.hash(user.password, salt);  
});
User.belongsTo(Role, { foreignKey: 'role_id' });

export default User;
