export type UncloggerPromptModalPropType = {
  isNew: boolean
  show: boolean
  onHide: () => void
  onTriggerReload: () => Promise<void>
  initialData:
    | {
        id: string
        category: string
        body: string
        language: string
        status: string
        reviewNote: string
      }
    | undefined
}
