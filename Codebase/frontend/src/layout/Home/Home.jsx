import About from "../../feature/Common/About"
import Contact from "../../feature/Common/Contact"
import Footer from "../../feature/Common/Footer"
import Hero from "../../feature/Common/Hero"
import Nav from "../../feature/Common/Nav"
import Services from "../../feature/Common/Services"

function Home() {
    return (
        <div>
            <Nav />
            <Hero />
            <About />
            <Services />
            <Contact />
            <Footer />
        </div>
    )
}

export default Home
