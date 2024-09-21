import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import logo from "../../assets/logo2.svg";
import { IoArrowUpCircle } from "react-icons/io5";
import iconlogo from "../../assets/icon.svg";
import avatar from "../../assets/avatar2.svg";
import { handleUserInput, checkFileType} from "../../helpers/helper";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateResponse = () => {
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "This is an automated response!" }, // response might be more than text
      ]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      handleUserInput(input)
        .then((response) => {
          console.log("API Response:", response);
          let fileType = checkFileType(response[0]);
          console.log("File Type:", fileType);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setInput("");
      simulateResponse();
    }
  };

  return (
    <main className="h-auto lg:h-[90vh] md:h-[90vh] flex flex-col mb-8">
      <section className="flex py-6 border-b border-grey justify-between lg:flex-row md:flex-row flex-col">
        <img
          src={logo}
          alt=""
          className="block lg:hidden md:hidden w-[200px] pb-12 px-4"
        />
        <h2 className="lg:text-[24px] md:text-[24px] text-[20px] font-InstrumentSerif px-4 italic mb-4">
          AI Chat
        </h2>

        <div className="flex justify-between lg:w-[50%] md:w-[50%] w-[100%] px-4 mb-4">
          <IoNotificationsCircleOutline className="text-5xl" />
          <div className="flex items-center lg:w-[50%] md:w-[50%] w-[80%] rounded-full border border-grey px-6 py-4">
            <FaSearch className="mr-4 text-xl" />
            <input
              type="text"
              placeholder="Search"
              required
              className="bg-transparent outline-0"
            />
          </div>
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
                className={`mb-3 p-2`}
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
                  <p className="text-white flex items-center">
                    <img src={iconlogo} alt="" className="mr-4 w-[50px]" />{" "}
                    {message.text}
                  </p>
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
            className="bg-transparent outline-0"
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
