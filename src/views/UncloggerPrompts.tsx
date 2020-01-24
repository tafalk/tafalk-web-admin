import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Pagination from 'react-bootstrap/Pagination'
import {
  uncloggerPromptTableHeaders,
  itemsPerPageOptions
} from '../utils/tableUtils'
import { uncloggerPromptStatuses } from '../utils/constants'
import {
  ListUncloggerPrompts,
  CountUncloggerPrompts
} from '../graphql/UncloggerPrompt'
import TafalkAdminUpsertUncloggerPromptModal from '../components/uncloggerPrompt/UpsertUncloggerPromptModal'
import {
  AppSyncUncloggerPrompt,
  AppSyncListUncloggerPromptsResultData,
  AppSyncCountUncloggerPromptsResultData
} from '../types/appsync/uncloggerPrompt'

const UncloggerPromptsView: React.FC = () => {
  // Hooks
  const [isUpsertDialogVisible, setIsUpsertDialogVisible] = useState(false)
  const [activeTablePage, setActiveTablePage] = useState<number>(1)
  const [activeItemsPerPage, setActiveItemsPerPage] = useState<number>(5)
  const [prompts, setPrompts] = useState<AppSyncUncloggerPrompt[]>([])
  const [totalPromptCount, setTotalPromptCount] = useState<number>(0)
  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        const [result, countResult] = await Promise.all([
          (await API.graphql(graphqlOperation(ListUncloggerPrompts))) as {
            data: AppSyncListUncloggerPromptsResultData
          },
          (await API.graphql(graphqlOperation(CountUncloggerPrompts))) as {
            data: AppSyncCountUncloggerPromptsResultData
          }
        ])
        setTotalPromptCount(countResult.data.countUncloggerPrompts)
        setPrompts(result.data.listUncloggerPrompts)
      } catch (err) {
        console.log(JSON.stringify(err))
      }
    })()
  }, [])

  // Functions
  const pageCount = (): number => {
    return totalPromptCount > 0
      ? Math.ceil(totalPromptCount / activeItemsPerPage)
      : 0
  }
  const activeTablePageChanged = (p: number): void => {
    setActiveTablePage(p)
  }
  const itemsPerPageChanged = (e: React.SyntheticEvent): void => {
    const currTarget = e.currentTarget as HTMLInputElement
    setActiveItemsPerPage(parseInt(currTarget.value))
  }
  const statusFilterChanged = (e: React.SyntheticEvent): void => {
    const currTarget = e.currentTarget as HTMLInputElement
    // TODO: Trigger a render
    // setActiveItemsPerPage(parseInt(currTarget.value))
  }
  const searchTextChanged = (e: React.SyntheticEvent): void => {
    const currTarget = e.currentTarget as HTMLInputElement
    // TODO: Trigger a render
    // setActiveItemsPerPage(parseInt(currTarget.value))
  }
  const rowClicked = (e: React.SyntheticEvent): void => {
    const currTarget = e.currentTarget as HTMLInputElement
    // TODO: Trigger a render
    // setActiveItemsPerPage(parseInt(currTarget.value))
  }

  // Render
  return (
    <Container fluid>
      <Row>
        <Col sm={6}>
          {/* Title */}
          <Breadcrumb>
            <Breadcrumb.Item active>Unclogger Prompts</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col sm={{ span: 2, offset: 4 }}>
          {/* Create New Button */}
          <Button block onClick={(): void => setIsUpsertDialogVisible(true)}>
            New
          </Button>
        </Col>
      </Row>
      {/* Filters */}
      <Row>
        <Col sm={{ span: 4, offset: 4 }}>
          {/* Status */}
          <FormControl
            as="select"
            aria-label="StatusFilter"
            aria-describedby="statusFilterLabel"
            onChange={(e): void => statusFilterChanged(e)}
          >
            {uncloggerPromptStatuses.map((o: string) => (
              <option key={o}>{o}</option>
            ))}
          </FormControl>
        </Col>
        <Col sm={{ span: 4 }}>
          {/* Search */}
          <FormControl
            placeholder="Search"
            aria-label="Search"
            aria-describedby="searchLabel"
            onChange={(e: React.SyntheticEvent): void => {
              return searchTextChanged(e)
            }}
          ></FormControl>
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
              <tr key={p.id} onClick={(e): void => rowClicked(e)}>
                <td>{p.id}</td>
                <td>{p.category}</td>
                <td>{p.body}</td>
                <td>{p.creatorUserId}</td>
                <td>{p.createTime}</td>
                <td>{p.status}</td>
                <td>{p.reviewTime}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row className="d-flex justify-content-end">
        {/* Items per Page */}
        <Col sm="6" md="3">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="itemsPerPageLabel">
                Items per Page
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="select"
              aria-label="ItemsPerPage"
              aria-describedby="itemsPerPageLabel"
              onChange={(e): void => itemsPerPageChanged(e)}
            >
              {itemsPerPageOptions.map((o: number) => (
                <option key={o}>{o}</option>
              ))}
            </FormControl>
          </InputGroup>
        </Col>
        {/* Page */}
        <Pagination>
          {Array.from({ length: pageCount() }, (_, i) => i + 1).map(
            (p: number) => (
              <Pagination.Item
                key={p}
                active={p === activeTablePage}
                onClick={(): void => activeTablePageChanged(p)}
              >
                {p}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </Row>
      {/* Upsert Dialog */}
      <TafalkAdminUpsertUncloggerPromptModal
        show={isUpsertDialogVisible}
        onHide={(): void => setIsUpsertDialogVisible(false)}
        initialData={undefined}
      />
    </Container>
  )
}

export default UncloggerPromptsView
