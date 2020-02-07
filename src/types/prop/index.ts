export type UncloggerPromptModalPropType = {
  show: boolean
  onHide: () => void
  onTriggerReload: () => Promise<void>
  initialData:
    | {
        category: string
        body: string
        language: string
        status: string
      }
    | undefined
}
