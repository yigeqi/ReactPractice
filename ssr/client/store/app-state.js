import { observable, computed, action } from 'mobx'

export default class AppState {
  constructor({ count, name } = { count: 0, name: 'lily' }) {
    this.count = count
    this.name = name
  }
  @observable count
  @observable name
  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }
  @action changeName(name) {
    this.name = name
  }
  // 用于ssr时的数据注入
  toJSON() {
    return {
      count: this.count,
      name: this.name
    }
  }
}
