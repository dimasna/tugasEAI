import mongoose, { Schema } from 'mongoose'

const transaksiSchema = new Schema({
  idDivisi: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  jenis: {
    type: String
  },
  biaya: {
    type: String
  },
  status: {
    type: String
  },
  keterangan: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

transaksiSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      idDivisi: this.idDivisi.view(full),
      jenis: this.jenis,
      biaya: this.biaya,
      status: this.status,
      keterangan: this.keterangan,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Transaksi', transaksiSchema)

export const schema = model.schema
export default model
