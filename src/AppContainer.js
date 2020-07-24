import { connect } from "react-redux";
import App from "./App";
import actions from "./redux/actions";
import { selectors } from "./redux/reducers";
import { bindActionCreators } from "redux";

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchNews: bindActionCreators(
        actions.newsSearchActions.fetchNewsFromApi,
        dispatch
      ),
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    newsData: selectors.newsSelectors.getResult(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
