import React, { Component } from 'react'
import Header from './components/Header'
import SubHeader from 
import MarketPlace from 
import LastRented from
import AboutUs from
import LorenIpsun from
import TopRenters from
import Games from
import SocialMedia from
import Footer from './components/Footer'

export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <SubHeader />
                <MarketPlace />
                <LastRented />
                <AboutUs />
                <LorenIpsun />
                <TopRenters />
                <Games />
                <SocialMedia />
                <Footer />
            </div>
        )
    }
}
