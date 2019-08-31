import AppState from './app-state'

// createStoreMap用于服务端渲染时的store
export default () => ({
  appState: new AppState()
})
