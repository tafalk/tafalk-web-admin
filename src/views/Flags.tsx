import React from 'react'
import { Table, Header } from 'semantic-ui-react'
import { flagTableHeaders } from '../utils/tableUtils'

const FlagsView: React.FC = () => {
  return (
    <div>
      <Header as='h2' color='grey'>
        Flags
      </Header>
      <Table color='olive'>
        <Table.Header>
          <Table.Row>
            {flagTableHeaders.map((headerObj, index) => (
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
            <Table.Cell>2019-09-19</Table.Cell>
            <Table.Cell>2019-09-20</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

export default FlagsView