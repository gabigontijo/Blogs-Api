module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      displayName: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true, allowNull: false  },
      password: { type: DataTypes.STRING, allowNull: false },
      image: DataTypes.STRING,
    },
    {
      timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
      tableName: 'users',
      underscored: true,
    });

    User.associate = (models) => {
      User.hasOne(models.BlogPost,
        { foreignKey: 'userId', as: 'blogPosts' });
    };

    return User;
  }; 