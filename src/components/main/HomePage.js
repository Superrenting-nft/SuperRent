import React from 'react'
import Header from '../header/Header'
import MarketPlace from '../main/MarketPlace'

import LastRented from '../last-rented/LastRented'
import AboutUs from '../about/AboutUs'
import LorenIpsun from '../main/extras/LorenIpsun'

import TopRenters from '../last-rented/TopRenters'
import Games from '../games/Games'
import SocialMedia from '../socialmedia/SocialMedia'

import LinksFooter from '../footer/LinksFooter'
import PageNavbar from '../header/PageNavbar'

export default function HomePage() {
    return (
        <div>
            <PageNavbar />
            <MarketPlace />
            <SocialMedia /> 
            <LinksFooter />
        </div>
    )
}
