import { About } from "./About"
import { Footer } from "./Footer"
import { Hero } from "./Hero"
import { ScrollToTop } from "./ScrollToTop"
import { Sponsors } from "./Sponsors"
import { Team } from "./Team"

const Home = () => {
  return (
    <>
      <Hero />
      <Sponsors />
      <About />
      <Team />
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default Home