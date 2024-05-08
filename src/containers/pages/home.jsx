import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import Banner from "../../components/mainPage/banner";


function Home({

}) {
    


  return (
    <Layout>
    <Banner/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({


});

export default connect(mapStateToProps, {

})(Home);
