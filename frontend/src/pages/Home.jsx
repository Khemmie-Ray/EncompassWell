import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import heroImg from "../assets/hero1.svg";
import logo from "../assets/logo.svg";
import HIWCards from "../components/HIWCards";
import nftBg from "../assets/nft.png";
import logoW from "../assets/mini.svg";
import artNFT from "../assets/artNft.svg";
import avatar1 from "../assets/avartar1.svg";
import avatar2 from "../assets/avatar2.svg";
import avatar3 from "../assets/avatar3.svg";

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <section className="lg:px-16 md:px-16 px-6 my-20 flex justify-between items-start flex-col lg:flex-row md:flex-row">
          <div className="w-[100%] lg:w-[45%] md:w-[45%] border-b border-grey pb-8">
            <img src={logo} alt="" className="w-[68px] h-[64px]" />
            <h1 className="lg:text-[72px] md:text-[72px] text-[48px] font-[600] my-5 pr-4">
              Your AI{" "}
              <em className="ml-2 font-[400] font-InstrumentSerif">
                Art <br /> Therapy{" "}
              </em>{" "}
              Studio
            </h1>
            <div className="flex justify-between items-center flex-col lg:flex-row md:flex-row">
              <p className="lg:text-[18px] md:text-[18px] text-[16px] text-[#BEBEBE] lg:w-1/3 md:w-1/3 w-full mb-4 lg:mb-0 md:mb-0">
                Try it out for free
              </p>
              <button className="bg-secondary rounded-full px-6 py-4 text-primary lg:w-1/3 md:w-1/3 w-full">
                Get Started
              </button>
              <div className="border-b border-grey lg:w-1/3 md:w-1/3 w-full"></div>
            </div>
          </div>
          <div className="w-[100%] lg:w-[55%] md:w-[55%]">
            <img src={heroImg} alt="" />
          </div>
        </section>
        <section className="lg:mx-16 md:mx-16 mx-6 pt-6 my-40 bg-[#F8845E] rounded-[30px] flex justify-between flex-col lg:flex-row md:flex-row" id="about">
          <div
            className="w-[100%] lg:w-[45%] md:w-[45%] bg-cover bg-center h-[55vh] rounded-bl-[30px] lg:order-1 md:order-1 order-2 rounded-br-[30px] lg:rounded-br-0 md:rounded-br-0"
            style={{ backgroundImage: `url(${nftBg})` }}
          ></div>
          <div className="w-[100%] lg:w-[55%] md:w-[55%] lg:order-2 md:order-2 order-1 self-center">
              <img src={logoW} alt="" className="w-[100px]" />
            <div className="lg:text-[130px] md:text-[130px] text-[52px] font-[600] bg-gradient-to-b from-white via-white/70 to-white/5 bg-clip-text text-transparent">
              <h2 className="mb-0">Built for</h2>
              <h2>Tranquility</h2>
            </div>
          </div>
        </section>
        <section className="lg:px-16 md:px-16 px-6" id="topArtist">
          <h2 className="lg:text-[56px] md:text-[56px] text-[32px] font-[500] my-8 py-4 border-b border-grey mb-14">
            Top{" "}
            <em className="ml-2 font-[400] font-InstrumentSerif">Artists</em>
          </h2>
          <div className="flex justify-between items-center flex-col lg:flex-row md:flex-row">
            <div className="relative rounded-[30px] pt-16 pb-4 w-[100%] lg:w-[32%] md:w-[32%] bg-gradient-to-b from-[#B9A7C3]/40 to-[#030A04] mt-16">
              <p className="border-b border-grey"></p>
              <img
                src={avatar1}
                alt=""
                className="absolute top-0 left-8 w-[148px] h-[148px] transform translate-y-[-50%]"
              />
              <div className="flex justify-between items-center mb-6 mt-10 px-6">
                <div>
                  <h3 className="font-InstrumentSerif lg:text-[38px] md:text-[38px] text-[32px]">
                    <em> Jo Edor</em>
                  </h3>
                  <p className="font-Geist lg:text-[20px] md:text-[20px] text-[16px]">
                    @joedor
                  </p>
                </div>
                <button className="bg-secondary rounded-full px-6 py-4 text-primary">
                  View Artworks
                </button>
              </div>
              <img src={artNFT} alt="" className="pl-6" />
            </div>
            <div className="relative rounded-[30px] pt-16 pb-4 w-[100%] lg:w-[32%] md:w-[32%] bg-gradient-to-b from-[#B9A7C3]/40 to-[#030A04] mt-16">
              <p className="border-b border-grey"></p>
              <img
                src={avatar2}
                alt=""
                className="absolute top-0 left-8 w-[148px] h-[148px] transform translate-y-[-50%]"
              />
              <div className="flex justify-between items-center mb-6 mt-10 px-6">
                <div>
                  <h3 className="font-InstrumentSerif lg:text-[38px] md:text-[38px] text-[32px]">
                    <em> Khemmie</em>
                  </h3>
                  <p className="font-Geist lg:text-[20px] md:text-[20px] text-[16px]">
                    @kemms
                  </p>
                </div>
                <button className="bg-secondary rounded-full px-6 py-4 text-primary">
                  View Artworks
                </button>
              </div>
              <img src={artNFT} alt="" className="pl-6" />
            </div>
            <div className="relative rounded-[30px] pt-16 pb-4 w-[100%] lg:w-[32%] md:w-[32%] bg-gradient-to-b from-[#B9A7C3]/40 to-[#030A04] mt-16">
              <p className="border-b border-grey"></p>
              <img
                src={avatar3}
                alt=""
                className="absolute top-0 left-8 w-[148px] h-[148px] transform translate-y-[-50%]"
              />
              <div className="flex justify-between items-center mb-6 mt-10 px-6">
                <div>
                  <h3 className="font-InstrumentSerif lg:text-[38px] md:text-[38px] text-[32px]">
                    <em> Mayowa</em>
                  </h3>
                  <p className="font-Geist lg:text-[20px] md:text-[20px] text-[16px]">
                    @mayowa
                  </p>
                </div>
                <button className="bg-secondary rounded-full px-6 py-4 text-primary">
                  View Artworks
                </button>
              </div>
              <img src={artNFT} alt="" className="pl-6" />
            </div>
          </div>
        </section>

        <section className="lg:px-16 md:px-16 px-6 my-40">
          <h2 className="lg:text-[56px] md:text-[56px] text-[32px] font-[500] my-8 py-4 border-b border-grey">
            Get{" "}
            <em className="ml-2 font-[400] font-InstrumentSerif">Started</em>
          </h2>
          <HIWCards />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
