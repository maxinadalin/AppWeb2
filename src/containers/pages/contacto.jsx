import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import Contacto from "../../components/contacto/contact"




function Contact({

}) {
    


  return (
    <Layout>
        <Contacto/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({


});

export default connect(mapStateToProps, {

})(Contact);
