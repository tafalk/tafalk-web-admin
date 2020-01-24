import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Table from 'react-bootstrap/Table'
import { flagTableHeaders } from '../utils/tableUtils'

const FlagsView: React.FC = () => {
  return (
    <Container fluid>
      <Row>
        {/* Title */}
        <Breadcrumb>
          <Breadcrumb.Item active>Flags</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        {/* Table */}
        <Table striped bordered hover>
          <thead>
            <tr>
              {flagTableHeaders.map((headerObj, index) => (
                <th key={index}>{headerObj.text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>Spam</td>
              <td></td>
              <td>RESOLVED</td>
              <td>2019-09-19</td>
              <td>2019-09-20</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  )
}

export default FlagsView
