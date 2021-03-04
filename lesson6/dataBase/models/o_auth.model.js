const { Schema, model } = require('mongoose');

const { USER, O_AUTH } = require('../../constant/dataBaseTables.enum');

const O_AUTHSchema = new Schema({
    access_token: { type: String },
    refresh_token: { type: String },
    _user_id: { type: Schema.Types.ObjectId, ref: USER }
}, { timestamps: true });

module.exports = model(O_AUTH, O_AUTHSchema);
