import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import Banner from "../../components/mainPage/banner";
import MainCategory from "../../components/mainPage/category";
import OnSale from "../../components/mainPage/Promociones";
import NewArrivals from "../../components/mainPage/RecienArrivados";
import LearningVideo from "../../components/mainPage/videos";
import AboutMe from "../../components/mainPage/aboutMe";
import {get_discount_products} from "../../redux/actions/products"
import { useEffect } from "react";



function Home({
  get_discount_products
}) {
    
useEffect (() =>{
  get_discount_products()
},[])

  return (
    <Layout>
    <Banner/>
    <MainCategory/>
    <OnSale/>
    <AboutMe/>
    <LearningVideo/>
    <NewArrivals/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({


});

export default connect(mapStateToProps, {
  get_discount_products
})(Home);
