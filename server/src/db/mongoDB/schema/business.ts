import { MySchema } from './baseSchema';
import { CompProp, CompStyle } from './schemaType';

/**
 * 测试Schema
 */
export const TestSchema = new MySchema({
    name: String,
    age: Number,
    gender: String,
}).getSchema();

/**
 * 用户Schema
 */
export const UserSchema = new MySchema({
    userId: String,
    userName: String,
    userAge: Number,
    userGender: String,
    userPwd: String,
    userEmail: String
}).getSchema();

/**
 * 项目Schema
 */
export const ItemSchema = new MySchema({
    itemId: String,
    itemTitle: String,
    itemPublic: Boolean,
    itemDescription: String,
    itemPublicPage: String,
    userId: String,
    groupId: String,
}).getSchema();

/**
 * Group Schema
 * 每个页面的所有组件的组合Json数据
 */
export const GroupSchema = new MySchema({
    groupId: String,
    groupTitle: String,
    groupJson: String
}).getSchema();

/**
 * 物料 Schema
 */
export const CompSchema = new MySchema({
    compId: String,
    compName: String,
    compTitle: String,
    compType: String,
    compProps: Array<CompProp>,
    compStyles: Array<CompStyle>,
    dataSourceId: String,
}).getSchema();

/**
 * 数据源 Schema
 * ds: dataSource
 */
export const DataSourceSchema = new MySchema({
    dsId: String,
    dsTitle: String,
    dsNumbers: Number,
    dsColumns: Array<String>,
    dsStaticDatas: Array<Array<Number>>,
    dsApiPath: String,
    dsPath: String,
}).getSchema();


/**
 * 字典-type
 * sgt：selectGroupType
 */
export const SgtSchema = new MySchema({
    sgtId: String,
    sgtName: String,
    sgtCode: String,
}).getSchema();


/**
 * 字典-entry
 * sge：selectGroupEntry
 */
export const SgeSchema = new MySchema({
    sgeId: String,
    sgtId: String,
    sgeName: String,
    sgeValue: String,
    sgeCode: String,
}).getSchema();