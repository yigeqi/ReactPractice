import {
  observable,
  computed,
  action
  // autorun
} from 'mobx';

export default class AppState {
  @observable num = 0
  @observable name = 'Jim'
  @computed get msg() {
    return `${this.name} says the num is ${this.num}`
  }

  @action
  addNum() {
    this.num += 1
  }
  @action
  changeName(name) {
    this.name = name
  }
}

// export const appState = new AppState()

// autorun(() => {
//   console.log(appState.msg)
// })

// setInterval(() => appState.addNum(), 1000)

// export default appState
