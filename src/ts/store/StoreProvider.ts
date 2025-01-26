export type GlobalState = {
  device: string
  viewport: {
    width: number
    height: number
  }
  resourceAmount: number
}

export interface StoreInterface {
  getState: () => GlobalState
  setState: <Key extends keyof GlobalState>(key: Key, value: GlobalState[Key]) => void
  subscribe: (listener: (state: GlobalState) => void) => () => void
}

export class Store {
  private state: GlobalState
  private listeners: Set<(state: GlobalState) => void>

  constructor(initialState?: Partial<GlobalState>) {
    this.state = {
      device: '',
      viewport: {
        width: 0,
        height: 0,
      },
      resourceAmount: 0,
      ...initialState,
    }

    /**
     * 値の追加や削除を行えるビルドインオブジェクトを生成 , setStateの発火時に新たなstateに変更される => notify()でリスナーを動かすことができる。
     */
    this.listeners = new Set() //同名のリスナーを登録しないようにするため、Setを使う
  }

  public getState(): GlobalState {
    return this.state
  }

  public setState<Key extends keyof GlobalState>(key: Key, value: GlobalState[Key]) {
    this.state = {
      ...this.state,
      [key]: value,
    }

    this.notify()
  }

  public subscribe(listener: (state: GlobalState) => void) {
    this.listeners.add(listener)

    return () => {
      this.listeners.delete(listener)
    }
  }

  private notify(): void {
    /**
     * setStateが呼ばれるたびに、登録されたリスナーにstateを渡す => リスナーを各クラスから呼び出して、グローバルに状態変化を受け取って動作できる。
     */
    this.listeners.forEach((listener) => {
      //引数のstateは、setStateで変更されたstate。カスタマイズするときは、this.stateをいじる
      listener(this.state)
    })
  }
}

export class StoreProvider {
  private stores: Map<string, Store>
  private static instance: StoreProvider

  constructor() {
    this.stores = new Map() //一応、Mapで複数のstoreを管理できるようにはしている。基本的に"app"ストアしか使わない予定だけど。
  }

  public static getInstance(): StoreProvider {
    //シングルトン
    if (!StoreProvider.instance) {
      StoreProvider.instance = new StoreProvider()
    }
    return StoreProvider.instance
  }

  public createStore(name: string, initialState?: Partial<GlobalState>): Store {
    /**
     * GlobalStateにあるプロパティをオプショナルに受け付ける
     */
    const store = new Store(initialState)

    this.stores.set(name, store)

    return store
  }

  public getStore(name: string): Store | undefined {
    return this.stores.get(name)
  }

  public static getGlobalStore(name: string = 'app'): Store | undefined {
    return this.getInstance().getStore(name)
  }
}
