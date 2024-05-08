
import { connect } from "react-redux"
import Navbar from "../components/navigations/navbar"
import Footer from "../components/navigations/footer"

function Layout({ children}) {
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
}) (Layout)