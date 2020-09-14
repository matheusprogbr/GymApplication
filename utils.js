module.exports = {
  age: (timestamp) => {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    const day = today.getDate() - birthDate.getDate();

    if((month < 0) || ((month == 0) && (day < 0))) return --age;

    return age;
  },

  gender: (value) => {
    if(value == 'M') return 'Masculino';
    return 'Feminino';
  }
};