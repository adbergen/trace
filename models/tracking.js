module.exports = function(sequelize, DataTypes) {
  var Tracking = sequelize.define("Tracking", {
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    carrier: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1],
    },
  });

  // tracking.associate =
  Tracking.associate = function(models) {
    // We're saying that a Tracking should belong to an Author
    // A Tracking can't be created without an Author due to the foreign key constraint
    // models.user
    Tracking.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Tracking;
};
