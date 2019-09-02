import React, { Component, createRef } from 'react';
import { Grid, Loader, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import JobList from '../JobList/JobList';
import { getJobsForDashboard } from '../jobActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { firestoreConnect } from 'react-redux-firebase';


const mapState = state => ({
  jobs: state.jobs.jobs, //s25_e235 to integrate seperate fetch job for user
  loading: state.async.loading,
});

const actions = {
  getJobsForDashboard
};

class JobDashboard extends Component {
  contextRef = createRef();

  state = {
    moreJobs: false,
    loadingInitial: true,
    loadedJobs: []
  };

  async componentDidMount() {
    let next = await this.props.getJobsForDashboard();

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreJobs: true,
        loadingInitial: false
      });
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.jobs !== prevProps.jobs) {
      this.setState({
        loadedJobs: [...this.state.loadedJobs, ...this.props.jobs]
      });
    }
  };

  getNextJobs = async () => {
    const { jobs } = this.props;
    let lastJob = jobs && jobs[jobs.length - 1];
    let next = await this.props.getJobsForDashboard(lastJob);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreJobs: false
      });
    }
  };

  render() {
    const { loading } = this.props;
    const { moreJobs, loadedJobs } = this.state;
    if (this.state.loadingInitial) return <LoadingComponent />; // inverted= {false} will a darker loading screen
    return (
      <Grid>
        <Grid.Column width={10}>
          <div ref={this.contextRef}>
            <JobList
              loading={loading}
              jobs={loadedJobs}
              moreJobs={moreJobs}
              getNextJobs={this.getNextJobs}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <Header content='Employee Search Filter' />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect(JobDashboard));
