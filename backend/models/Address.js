import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Address extends Model {}

Address.init(
  {
    address_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      references: { model: "users", key: "user_id" },
    },
    address_type: {
      type: DataTypes.ENUM("shipping", "billing"),
      defaultValue: "shipping",
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: { type: DataTypes.STRING, allowNull: false },
    is_default: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    modelName: "Address",
    tableName: "addresses",
    underscored: true,
  }
);
