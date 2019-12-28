export type UncloggerPromptModalPropType = {
  show: boolean
  onHide: () => void
  initialData:
    | {
        category: string
        body: string
        language: string
        status: string
      }
    | undefined
}
