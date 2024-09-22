import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoNotificationsCircleOutline, IoArrowUpCircle } from "react-icons/io5";
import logo from "../../assets/logo.svg";
import iconlogo from "../../assets/icon.svg";
import avatar from "../../assets/avatar2.svg";
import { handleUserInput, checkFileType } from "../../helpers/helper";
import ConnectButton from "../../components/ConnectButton";
import MintNft from "../../components/MintNft";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateResponse = (fileType, data) => {
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          content: data, 
          fileType: fileType, 
        },
      ]);
    }, 1000);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      try {
        const response = await handleUserInput(input); 
        const fileType = checkFileType(response[0]); 
        simulateResponse(fileType, response); 
      } catch (error) {
        console.error("Error:", error);
      }
      setInput("");
    }
  };

  const renderMessageContent = (content, fileType) => {
    return content.map((item, index) => {
      if (fileType === "image") {
        return (
          <div className="w-[100%] lg:w-[47%] md:w-[47%]">
        <img key={index} src={item} alt="response" className="w-[100%] rounded-lg h-auto mb-2" />
       <MintNft item={item} />
        </div>)
      } else if (fileType === "audio") {
        return (
          <audio key={index} controls className="mb-2">
            <source src={item} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        );
      } else {
        return <p key={index} className="text-white mb-2">{item}</p>;
      }
    });
  };

  return (
    <main className="h-auto lg:h-[90vh] md:h-[90vh] flex flex-col mb-8">
      <section className='flex py-6 border-b border-grey justify-between lg:flex-row md:flex-row flex-col'>
        <div className='flex justify-between lg:hidden md:hidden  pb-12 px-4 items-center'>
        <img src={logo} alt="" className='w-[50px]'/>
          <ConnectButton />
          </div>
            <h2 className='lg:text-[24px] md:text-[24px] text-[20px] font-InstrumentSerif px-4 italic mb-4'>AI Chat</h2>       
            <div className='flex justify-between lg:w-[50%] md:w-[50%] w-[100%] px-4 mb-4'>
                <IoNotificationsCircleOutline className='text-5xl'/>
            <div className="flex items-center lg:w-[80%] md:w-[80%] w-[80%] rounded-full border border-grey px-6 py-4">
            <FaSearch className="mr-4 text-xl" />
            <input
              type="text"
              placeholder="Search"
              required
              className="bg-transparent outline-0"
            />
            </div>
          </div>
          <div className='hidden lg:flex md:flex'>
          <ConnectButton />
          </div>
        </section>
      <section className="lg:w-[80%] md:w-[80%] w-[90%] mx-auto mt-10">
        <div
          ref={chatRef}
          className="h-64 lg:h-[60vh] md:h-[60vh] overflow-y-auto p-4 flex flex-col"
        >
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className="mb-3 p-2"
                style={{
                  alignSelf:
                    message.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                {message.sender === "user" ? (
                  <p className="text-white flex items-center">
                    {message.text}
                    <img src={avatar} alt="" className="ml-4 w-[50px]" />
                  </p>
                ) : (
                  <div className="flex items-start my-4">
                    <img src={iconlogo} alt="" className="mr-4 w-[50px]" />
                    <div className="flex items-center justify-between lg:flex-row md:flex-row flex-col">
                    {renderMessageContent(message.content, message.fileType)}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-white m-auto">
              Start a conversation
            </p>
          )}
        </div>
      </section>
      <section className="lg:w-[80%] md:w-[80%] w-[90%] mx-auto mt-auto">
        <div className="flex items-center w-[100%] rounded-full border border-grey pl-6 justify-between bg-gradient-to-tr from-[#151A16] to-[#666666]/5 shadow-lg shadow-grey/20">
          <input
            type="text"
            placeholder="Write a message"
            required
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="bg-transparent outline-0 w-[80%]"
          />
          <button className="text-secondary" onClick={handleSendMessage}>
            <IoArrowUpCircle className="text-[60px]" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default AIChat;