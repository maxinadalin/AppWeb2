import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import Search from "../../components/navigations/search";


function Searching({

}) {
    


  return (
    <Layout>
        <Search/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({


});

export default connect(mapStateToProps, {

})(Searching);
