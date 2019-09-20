import React from 'react'
import { Table, Header } from 'semantic-ui-react'

const FlagsView: React.FC = () => {
  return (
    <div>
      <Header as='h2' color='grey'>
        Flags
      </Header>
      <Table color='olive'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Content Id</Table.HeaderCell>
            <Table.HeaderCell>Flag Category</Table.HeaderCell>
            <Table.HeaderCell>Flag Details</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Created</Table.HeaderCell>
            <Table.HeaderCell>LastChange</Table.HeaderCell>
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