import React from "react";
import artImg from '../assets/art.svg'
import { GoDotFill } from "react-icons/go";
import mintImg from '../assets/mint.svg'
import playImg from '../assets/play.svg'

const HIWCards = () => {
  return (
    <div className="flex justify-between items-center flex-col lg:flex-row md:flex-row my-0 lg:my-10 md:my-10">
      <div className="bg-[#F1B398] rounded-[30px] p-6 w-[100%] lg:w-[32%] md:w-[32%] flex flex-col text-[#A94114] mb-4">
        <p className="lg:text-[32px] md:text-[32px] text-[24px] flex font-[500] items-center mt-6">
          <GoDotFill /> Create <em className="font-[400] ml-2"> Art</em>
        </p>
        <p className="lg:text-[22px] md:text-[22px] text-[18px] ml-8">
          Create your desired art to express your mood
        </p>
        <img src={artImg} alt="" className="w-[207px] ml-auto" />
      </div>
      <div className="bg-[#CFCAD1] rounded-[30px] p-6 w-[100%] lg:w-[32%] md:w-[32%] flex flex-col text-[#5E5C6F] mb-4">
        <p className="lg:text-[32px] md:text-[32px] text-[24px] flex font-[500] items-center mt-6">
          <GoDotFill /> Play <em className="font-[400] ml-2"> Sounds</em>
        </p>
        <p className="lg:text-[22px] md:text-[22px] text-[18px] ml-8">
          Play desired sound to express your mood
        </p>
        <img src={playImg} alt="" className="w-[207px] ml-auto" />
      </div>
      <div className="bg-[#B9A6C3] rounded-[30px] p-6 w-[100%] lg:w-[32%] md:w-[32%] flex flex-col text-[#D7D2DA] mb-4">
        <p className="lg:text-[32px] md:text-[32px] text-[24px] flex font-[500] items-center mt-6">
          <GoDotFill /> What's on your{" "}
          <em className="font-[400] ml-2"> Mind</em>
        </p>
        <p className="lg:text-[22px] md:text-[22px] text-[18px] ml-8">
          Let’s talk about whar’s on your mind.
        </p>
        <img src={mintImg} alt="" className="w-[207px] ml-auto" />
      </div>
    </div>
  );
};

export default HIWCards;
