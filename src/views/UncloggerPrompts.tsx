import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { uncloggerPromptTableHeaders } from '../utils/tableUtils'
import { ListUncloggerPrompts } from '../graphql/UncloggerPrompt'
import TafalkAdminUpsertUncloggerPromptModal from '../components/uncloggerPrompt/UpsertUncloggerPromptModal'
import {
  AppSyncUncloggerPrompt,
  AppSyncListUncloggerPromptsResultData
} from '../types/appsync/uncloggerPrompt'

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
    <Container fluid>
      <Row>
        <Col md={4}>
          {/* Title */}
          <h2 style={{ color: 'grey' }}>Unclogger Prompts</h2>
        </Col>
        <Col md={{ span: 2, offset: 6 }}>
          {/* Create New Button */}
          <Button block onClick={(): void => setIsUpsertDialogVisible(true)}>
            New
          </Button>
        </Col>
      </Row>
      <Row>
        {/* Table */}
        <Table striped bordered hover>
          <thead>
            <tr>
              {uncloggerPromptTableHeaders.map((headerObj, index) => (
                <th key={index}>{headerObj.text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prompts.map((p: AppSyncUncloggerPrompt) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.category}</td>
                <td>{p.body}</td>
                <td>{p.creatorUserId}</td>
                <td>{p.createTime}</td>
                <td>{p.approveTime}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      {/* Upsert Dialog */}
      <TafalkAdminUpsertUncloggerPromptModal
        show={isUpsertDialogVisible}
        onHide={(): void => setIsUpsertDialogVisible(true)}
        initialData={undefined}
      />
    </Container>
  )
}

export default UncloggerPromptsView
