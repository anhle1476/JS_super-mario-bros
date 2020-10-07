export default class UpdateCenter {
  constructor() {
    this.objects = [];
  }

  addObject(object) {
    this.objects.push(object);
  }

  updateObjects() {
    this.objects.forEach((obj) => obj.update());
  }
}
