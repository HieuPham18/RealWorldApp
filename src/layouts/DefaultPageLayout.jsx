import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

function DefaultLayout(props) {
    return (
        <div>
            <Header />
            <div>
                {props.children}
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;