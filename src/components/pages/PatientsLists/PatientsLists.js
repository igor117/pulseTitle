import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { Row, Col, Panel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

import SortableTable from '../../containers/SortableTable/SortableTable';
import PaginationBlock from '../../presentational/PaginationBlock/PaginationBlock';
import patientsSelector from './selectors';
import { fetchPatientsRequest } from '../../../ducks/feth-patients.duck';
import { fetchPatientsOnMount } from '../../../utils/hoc-arguments/fetch-patients.utils';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

//TODO move it to *.config.js
const allTableHeaders = [
  { name: 'name', title: 'Name' },
  { name: 'address', title: 'Address' },
  { name: 'dateOfBirth', title: 'Born', transformer: getDDMMMYYYY },
  { name: 'gender', title: 'Gender' },
  { name: 'id', title: 'NHS No.' },
  { name: 'ordersDate', title: 'Orders', icon: <i className="fa fa-calendar" />, transformer: getDDMMMYYYY },
  { name: 'ordersCount', title: 'Orders ', icon: <span>#</span> },
  { name: 'resultsDate', title: 'Results', icon: <i className="fa fa-calendar" />, transformer: getDDMMMYYYY },
  { name: 'resultsCount', title: 'Results ', icon: <span>#</span> },
  { name: 'vitalsDate', title: 'Count', icon: <i className="fa fa-calendar" /> },
  { name: 'vitalsCount', title: 'Count ', icon: <span>#</span> },
  { name: 'diagnosesDate', title: 'Diagnoses', icon: <i className="fa fa-calendar" />, transformer: getDDMMMYYYY },
  { name: 'diagnosesCount', title: 'Diagnoses ', icon: <span>#</span> },
];

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientsRequest }, dispatch) });

@connect(patientsSelector, mapDispatchToProps)
@lifecycle(fetchPatientsOnMount)
class PatientsLists extends PureComponent {
  static propTypes = {
    allPatients: PropTypes.arrayOf(
      PropTypes.shape({
        address: PropTypes.string,
        dateOfBirth: PropTypes.number,
        gender: PropTypes.string,
        gpAddress: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        nhsNumber: PropTypes.string,
      })).isRequired,
    patientsPerPageAmount: PropTypes.number,
  };

  static defaultProps = {
    patientsPerPageAmount: 10,
  };

  state = {
    columnNameSortBy: '',
    sortingOrder: null,
    offset: 0,
  };

  handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

  handleSetOffset = offset => this.setState({ offset });

  render() {
    const { allPatients, patientsPerPageAmount } = this.props;
    const { columnNameSortBy, sortingOrder, offset } = this.state;
    const data = _.flow(
      _.sortBy([columnNameSortBy]),
      sortingOrder === 'desc'
        ? _.reverse
        : val => val,
      _.slice(offset, offset + patientsPerPageAmount)
    )(allPatients);

    return (<section className="page-wrapper">
      <Row>
        <Col xs={12}>
          {/*//TODO use <PTPanel/>*/}
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">Patinets info</h3>
            </div>
            <div className="panel-body">
              <div className="wrap-patients-table">
                <SortableTable
                  headers={allTableHeaders}
                  data={data}
                  onHeaderCellClick={this.handleHeaderCellClick}
                />
              </div>
              <PaginationBlock
                entriesPerPage={patientsPerPageAmount}
                totalEntriesAmount={_.size(allPatients)}
                offset={offset}
                setOffset={this.handleSetOffset}
              />
            </div>
          </div>
        </Col>
      </Row>
    </section>)
  }
}

export default PatientsLists;
