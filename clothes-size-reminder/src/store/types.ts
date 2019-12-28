export interface RootState {
    version: StringStore,
    name: StringStore,
}

export type StringStore = string | undefined
