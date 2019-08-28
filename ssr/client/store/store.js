import AppStateClass from './app-state'

export const AppState = AppStateClass

// createStoreMap用于服务端渲染时的store
export const createStoreMap = () => ({
  appState: new AppState()
})
