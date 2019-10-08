const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout));

class Noti {
  constructor(id, category, source, date) {
    this.id = id;
    this.category = category;
    this.title = '';
    this.source = source;
    this.date = date;
  }
}

module.exports = {
  sleep,
  Noti,
}