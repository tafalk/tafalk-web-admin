import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Table, Header } from 'semantic-ui-react'
import { uncloggerPromptTableHeaders } from '../utils/tableUtils'
import { ListUncloggerPrompts } from '../graphql/UncloggerPrompt'
import { UncloggerPromptType } from '../types'

const UncloggerPromptsView: React.FC = () => {
  // Hooks
  const [prompts, setPrompts] = useState([])
  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        const { data }: any = await API.graphql(
          graphqlOperation(ListUncloggerPrompts)
        )
        setPrompts(data?.listUncloggerPrompts?.items)
      } catch (err) {
        console.log(JSON.stringify(err))
      }
    })()
  }, [])
  return (
    <div>
      <Header as="h2" color="grey">
        Unclogger Prompts
      </Header>
      <Table color="olive">
        <Table.Header>
          <Table.Row>
            {uncloggerPromptTableHeaders.map((headerObj, index) => (
              <Table.HeaderCell key={index}>{headerObj.text}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {prompts.map((p: UncloggerPromptType) => (
            <Table.Row key={p.id}>
              <Table.Cell>{p.id}</Table.Cell>
              <Table.Cell>{p.category}</Table.Cell>
              <Table.Cell>{p.body}</Table.Cell>
              <Table.Cell>{p.creatorUserId}</Table.Cell>
              <Table.Cell>{p.createTime}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default UncloggerPromptsView
