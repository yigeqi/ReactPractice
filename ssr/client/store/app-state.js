import { observable, computed, autorun } from "mobx";

class AppState {
  @observable num = 0
  @observable name = 'Jim'
  @computed get msg() {
      return `${this.name} says the num is ${this.num}`
  }

  @action
  addNum() {
    this.num+=1
  }
}

const appState = new AppState()

autorun(()=>{
  console.log(this.msg)
})

setInterval(appState.addNum, 1000)

export default appState
