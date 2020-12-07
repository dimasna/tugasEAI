import mongoose, { Schema } from 'mongoose'

const transaksiSchemas = new Schema({
  idDivisi: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  jenis: {
    type: String,
    enum: ['debit', 'credit'],
    required: true
  },
  biaya: {
    type: Number,
    required: true
  },
  keterangan: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

transaksiSchemas.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      idDivisi: this.idDivisi.view(full),
      jenis: this.jenis,
      biaya: this.biaya,
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

const model = mongoose.model('Transaksi', transaksiSchemas)

export const schema = model.schema
export default model
