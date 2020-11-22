import mongoose, { Schema } from 'mongoose'

const statusSchema = new Schema({
  idTransaksi: {
    type: String
  },
  status: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

statusSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      idTransaksi: this.idTransaksi,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Status', statusSchema)

export const schema = model.schema
export default model
