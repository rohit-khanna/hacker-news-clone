import { connect } from "react-redux";
import App from "./App";
import actions from "./redux/actions";
import { selectors } from "./redux/reducers";
import { bindActionCreators } from "redux";

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchNews: bindActionCreators(
        actions.newsBusinessActions.fetchNews,
        dispatch
      ),
      upvote: bindActionCreators(actions.newsSearchActions.upVote, dispatch),
      hideNewsItem: bindActionCreators(
        actions.newsSearchActions.hideNewsItem,
        dispatch
      ),
      syncUpData: bindActionCreators(
        actions.newsSearchActions.syncNewsWithLocal,
        dispatch
      ),
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    newsData: selectors.newsSelectors.getResult(state).data,
    syncUprequired: selectors.newsSelectors.getSyncUprequired(state),
    pageDetails: selectors.newsSelectors.getPaginationDetails(state),
    ...ownProps,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
