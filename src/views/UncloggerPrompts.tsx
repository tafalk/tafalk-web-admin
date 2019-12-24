import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Table, Header, Button, Icon } from 'semantic-ui-react'
import { uncloggerPromptTableHeaders } from '../utils/tableUtils'
import { ListUncloggerPrompts } from '../graphql/UncloggerPrompt'
import {
  AppSyncUncloggerPrompt,
  AppSyncListUncloggerPromptsResultData
} from '../types/appsync/uncloggerPrompt'
import UpsertUncloggerPromptDialog from '../components/uncloggerPrompt/dialog/UpsertUncloggerPromptDialog'

const UncloggerPromptsView: React.FC = () => {
  // Hooks
  const [isUpsertDialogVisible, setIsUpsertDialogVisible] = useState(false)
  const [prompts, setPrompts] = useState<AppSyncUncloggerPrompt[]>([])
  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        const result = (await API.graphql(
          graphqlOperation(ListUncloggerPrompts)
        )) as {
          data: AppSyncListUncloggerPromptsResultData
        }
        setPrompts(result.data.listUncloggerPrompts.items)
      } catch (err) {
        console.log(JSON.stringify(err))
      }
    })()
  }, [])
  // Render
  return (
    <div>
      <Header as="h2" color="grey">
        {/* Title */}
        Unclogger Prompts
        {/* Create New Button */}
        <Button
          positive
          floated="right"
          onClick={(): void => setIsUpsertDialogVisible(true)}
        >
          <Icon name="plus" />
          &nbsp;New
        </Button>
      </Header>

      {/* Table */}
      <Table color="olive">
        <Table.Header>
          <Table.Row>
            {uncloggerPromptTableHeaders.map((headerObj, index) => (
              <Table.HeaderCell key={index}>{headerObj.text}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {prompts.map((p: AppSyncUncloggerPrompt) => (
            <Table.Row key={p.id}>
              <Table.Cell>{p.id}</Table.Cell>
              <Table.Cell>{p.category}</Table.Cell>
              <Table.Cell>{p.body}</Table.Cell>
              <Table.Cell>{p.creatorUserId}</Table.Cell>
              <Table.Cell>{p.createTime}</Table.Cell>
              <Table.Cell>{p.approveTime}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {/* Upsert Dialog */}
      {isUpsertDialogVisible && <UpsertUncloggerPromptDialog />}
    </div>
  )
}

export default UncloggerPromptsView
