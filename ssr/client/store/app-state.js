import { observable, computed, action } from 'mobx'

export class AppState {
  @observable count = 0
  @observable name = 'lily'
  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }
  @action add() {
    this.count += 1
  }
}

const appState = new AppState()

export default appState
