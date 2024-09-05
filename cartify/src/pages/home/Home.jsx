import React from 'react'
import HeroSection from '../../components/HeroSection'
import PopularCategories from './PopularCategories'
import SpecialItems from './SpecialItems'
import Explore from './Explore'


function Home() {
    return (
        <div>
            <HeroSection />
            <PopularCategories />
            <SpecialItems />
            <Explore />
        </div>
    )
}

export default Home