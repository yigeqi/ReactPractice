import AppState from './app-state'

export default {
  AppState
}
// createStoreMap用于服务端渲染时的store
export const createStoreMap = () => ({
  appState: new AppState()
})
