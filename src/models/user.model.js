import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  // ... (El schema es exactamente el mismo)
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
});

// El middleware pre-save para hashear la contraseña no cambia
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// El método para comparar contraseñas no cambia
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

// Cambiamos module.exports por export default
export default User;