import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import AboutUs from "../../components/aboutUs/aboutUs";



function About({

}) {
    


  return (
    <Layout>
        <AboutUs/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({


});

export default connect(mapStateToProps, {

})(About);
