import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import Categorias from "../../components/category/categorias";


function Categories({

}) {
    


  return (
    <Layout>
        <Categorias/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({


});

export default connect(mapStateToProps, {

})(Categories  );
