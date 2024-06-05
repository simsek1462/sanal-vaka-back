const ClinicSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    departments: [{
      type: Schema.Types.ObjectId,
      ref: 'Department'
    }]
  });
  
  module.exports = mongoose.model('Clinic', ClinicSchema);
  