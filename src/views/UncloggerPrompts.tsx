import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Table, Header } from 'semantic-ui-react'
import { uncloggerPromptTableHeaders } from '../utils/tableUtils'
import { ListUncloggerPrompts } from '../graphql/UncloggerPrompt'

const UncloggerPromptsView: React.FC = () => {
    // Hooks
    const [prompts, setPrompts] = useState([])

    useEffect(() => {
      (async function loadPrompts() {
        const result = await API.graphql(graphqlOperation(ListUncloggerPrompts))
        console.log(JSON.stringify(result))
        // setPrompts(result.data);
      })()
    }, [])
  return (
    <div>
      <Header as='h2' color='grey'>
        Flags
      </Header>
      <Table color='olive'>
        <Table.Header>
          <Table.Row>
            {uncloggerPromptTableHeaders.map((headerObj, index) => (
              <Table.HeaderCell
                key={index}
              >
                {headerObj.text}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Spam</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>RESOLVED</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

export default UncloggerPromptsView
