import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoNotificationsCircleOutline, IoArrowUpCircle } from "react-icons/io5";
import logo from "../../assets/logo.svg";
import iconlogo from "../../assets/icon.svg";
import avatar from "../../assets/avatar2.svg";
import {
  handleUserInput,
  checkFileType,
  pollMusicTaskId,
} from "../../helpers/helper";
import ConnectButton from "../../components/ConnectButton";
import MintNft from "../../components/MintNft";
import Frequency from "../../components/loaders/Frequency";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const [songUrl, setSongUrl] = useState([]);
  const [loading, setLoading] = useState(false);

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
    }, 2000);
  };

  const handleSendMessage = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const renderMessageContent = (content, fileType) => {
    return content.map((item, index) => {
      if (fileType === "image") {
        return (
          <div className="w-[100%] lg:w-[48%] md:w-[48%] shadow-lg bg-black p-4 rounded-lg mb-4">
            <img
              key={index}
              src={item}
              alt="response"
              className="w-[100%] rounded-lg h-auto mb-2"
            />
            <MintNft item={item} />
          </div>
        );
      } else if (fileType === "audio") {
        pollMusicTaskId(item).then((data) => setSongUrl(data));
        return (
          <div className="w-[100%] flex justify-between flex-col lg:flex-row md:flex-row">
            {songUrl?.map((url, index) => (
              <div className="flex w-[100%] lg:w-[48%] md:w-[48%] bg-gradient-to-tr from-[#051206]/40 to-[#030A04]/40 border-spacing-3 border-secondary/40 py-8 rounded-2xl px-4 mb-4 flex-col m-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-white mb-2 ">Audio {index + 1}</p>
                  <Frequency />
                </div>
                <audio key={index} controls className="my-4">
            <source src={url} type="audio/mpeg"/>
            Your browser does not support the audio tag.
          </audio>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <p key={index} className="text-white mb-2">
            {item}
          </p>
        );
      }
    });
  };

  return (
    <main className="h-auto lg:h-[90vh] md:h-[90vh] flex flex-col mb-8">
      <section className="flex py-6 border-b border-grey justify-between lg:flex-row md:flex-row flex-col">
        <div className="flex justify-between lg:hidden md:hidden  pb-12 px-4 items-center">
          <img src={logo} alt="" className="w-[50px]" />
          <ConnectButton />
        </div>
        <h2 className="lg:text-[24px] md:text-[24px] text-[20px] font-InstrumentSerif px-4 italic mb-4">
          AI Chat
        </h2>
        <div className="flex justify-between lg:w-[50%] md:w-[50%] w-[100%] px-4 mb-4">
          <IoNotificationsCircleOutline className="text-5xl" />
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
        <div className="hidden lg:flex md:flex">
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
                  <div className="chat chat-end text-white flex items-center">
                    <div className="chat-bubble">
                      <p>{message.text}</p>
                    </div>
                    <img src={avatar} alt="" className="ml-4 w-[50px]" />
                  </div>
                ) : (
                  <div className="flex items-start my-4 chat chat-start">
                    <img src={iconlogo} alt="" className="mr-4 w-[50px]" />
                    <div className="chat-bubble p-4">
                      <div className="flex items-center justify-between lg:flex-row md:flex-row flex-col w-[100%]">
                        {renderMessageContent(
                          message.content,
                          message.fileType
                        )}
                      </div>
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
          {loading && (
            <div className="mb-3 p-2 flex items-start chat chat-start">
              <img src={iconlogo} alt="bot" className="mr-4 w-[50px]" />
              <div className="chat-bubble">
                <p className="text-white">Loading...</p>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="lg:w-[80%] md:w-[80%] w-[90%] mx-auto mt-auto">
        <div className="flex items-center w-[100%] rounded-full border border-grey pl-6 justify-between bg-gradient-to-tr from-[#151A16] to-[#666666]/5 shadow-lg shadow-grey/20">
          <input
            type="text"
            required
            value={input}
            placeholder="Write a message"
            onChange={(e) => setInput(e.target.value)}
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
