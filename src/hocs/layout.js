
import { connect } from "react-redux"
import Navbar from "../components/navigations/navbar"
import Footer from "../components/navigations/footer"
import { useEffect } from "react";
import {check_authenticated,
    Load_user,
    refresh,} from "../redux/actions/auth"

function Layout({ children, check_authenticated,Load_user,refresh }) {
    useEffect(() => {
   //Dispatch your actions here
      check_authenticated();
      Load_user();
      refresh();
    }, [check_authenticated, Load_user, refresh]);
return(
    <div >
        <Navbar/>
        {children}
        <Footer/>
    </div>
)

}

const mapStateToProps = state => ({
    
})

export default connect (mapStateToProps,{
check_authenticated,
Load_user,
refresh,
}) (Layout)