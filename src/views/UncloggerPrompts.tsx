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
import {
  uncloggerPromptStatuses,
  allPromptStatusesText
} from '../utils/constants'
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
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [searchText, setSearchText] = useState<string>('')
  const [tablePage, setTablePage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [prompts, setPrompts] = useState<AppSyncUncloggerPrompt[]>([])
  const [totalPromptCount, setTotalPromptCount] = useState<number>(0)

  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        const [result, countResult] = await Promise.all([
          (await API.graphql(
            graphqlOperation(ListUncloggerPrompts, {
              limit: itemsPerPage,
              offset: tablePage - 1,
              searchText,
              status:
                statusFilter && statusFilter !== allPromptStatusesText
                  ? statusFilter
                  : undefined
            })
          )) as {
            data: AppSyncListUncloggerPromptsResultData
          },
          (await API.graphql(
            graphqlOperation(CountUncloggerPrompts, {
              searchText,
              status:
                statusFilter && statusFilter !== allPromptStatusesText
                  ? statusFilter
                  : undefined
            })
          )) as {
            data: AppSyncCountUncloggerPromptsResultData
          }
        ])
        console.log('Result:')
        console.log(result)
        setTotalPromptCount(countResult.data.countUncloggerPrompts ?? 0)
        setPrompts(result.data.listUncloggerPrompts ?? [])
      } catch (err) {
        console.log(JSON.stringify(err))
      }
    })()
  }, [itemsPerPage, searchText, statusFilter, tablePage])

  // Functions
  const pageCount = (): number => {
    return totalPromptCount > 0 ? Math.ceil(totalPromptCount / itemsPerPage) : 0
  }
  const tablePageChanged = (p: number): void => {
    setTablePage(p)
  }
  const itemsPerPageChanged = async (
    e: React.SyntheticEvent
  ): Promise<void> => {
    const currTarget = e.currentTarget as HTMLInputElement
    setItemsPerPage(parseInt(currTarget.value))
  }
  const statusFilterChanged = async (
    e: React.SyntheticEvent
  ): Promise<void> => {
    const currTarget = e.currentTarget as HTMLInputElement
    setStatusFilter(currTarget.value)
  }
  const searchTextChanged = async (e: React.SyntheticEvent): Promise<void> => {
    const currTarget = e.currentTarget as HTMLInputElement
    setSearchText(currTarget.value)
  }
  const onEditClicked = (e: React.SyntheticEvent): void => {
    const currTarget = e.currentTarget as HTMLInputElement
    console.log(currTarget)
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
            onChange={async (e): Promise<void> => await statusFilterChanged(e)}
          >
            <option>{allPromptStatusesText}</option>
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
            value={searchText}
            onChange={async (e: React.SyntheticEvent): Promise<void> => {
              await searchTextChanged(e)
            }}
          ></FormControl>
        </Col>
      </Row>
      <Row className="mt-3">
        {/* Table */}
        <Table striped hover responsive="sm">
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
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={(e): void => onEditClicked(e)}
                >
                  <span aria-label="Edit" role="image">
                    ✏️
                  </span>
                </td>
                <td>{p.id}</td>
                <td>{p.status}</td>
                <td>{p.category}</td>
                <td>{p.body}</td>
                <td>{p.creatorUserId}</td>
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
              onChange={async (e): Promise<void> =>
                await itemsPerPageChanged(e)
              }
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
                active={p === tablePage}
                onClick={(): void => tablePageChanged(p)}
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
