import { DataTypes } from 'sequelize';

//设备Model配置
export const deviceModelOptions = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    dev_code: {
        type: DataTypes.STRING
    },
    dev_name: {
        type: DataTypes.STRING
    },
    dev_type: {
        type: DataTypes.STRING
    },
};

//数据Model配置
export const dataModelOptions = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    data_code: {
        type: DataTypes.STRING
    },
    data_label: {
        type: DataTypes.STRING
    },
    data_name: {
        type: DataTypes.STRING
    },
    dev_id: {
        type: DataTypes.STRING
    },
}

//值Model配置
export const valueModelOptions = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    val_value: {
        type: DataTypes.STRING
    },
    val_time: {
        type: DataTypes.DATE
    },
    data_id: {
        type: DataTypes.STRING
    },
}