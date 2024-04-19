"use client";
import axios from "axios";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Checkbox from "@/components/Checkbox";
import Footer from "@/components/Footer";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Home() {
  const [subscribeData, setSubscribeData] = useState({});
  const [selectedNewsletters, setSelectedNewsletters] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);

  const submit = async (event) => {
    try {
      event.preventDefault();

      const res = await axios.post(`https://newsletter-gilt-nu.vercel.app/sub`, {
        email: subscribeData.email,
        username: subscribeData.username,
        newsletters: selectedNewsletters,
      });
      if (res.data.type === "already_subscribed") setError(true);
      else if (res.data.status === "success") setMessage(true);
      else {
        setError(false);
        setMessage(false);
      }
      console.log("afterReq", res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f8]">
      <NavBar />
      <div className="w-[90vw] max-w-[1288px] flex flex-col m-auto text-[#0f151e]">
        <div className="w-full text-[15px] font-[400] flex justify-start">
          <div className="flex items-center cursor-pointer hover:underline">
            <a href="/">Home</a> <MdKeyboardArrowRight className="text-[21px]" />
          </div>
          <h5 className="font-bold">Subscribe</h5>
        </div>

        <main className="my-[45px] h-auto box-border">
          <header className="text-[#333] text-[60px] font-[600] text-left">
            <h1>Subscribe to Our Newsletter</h1>
          </header>

          <div className="w-full box-border">
            <p className="my-[40px] text-[18px]">Check the names of the newsletters you'd like to receive directly in your email.</p>
            {message !== true ? (
              <div className="w-full box-border flex gap-[110px] ">
                <div className="max-w-[580px] min-w-[420px] basis-[50%]">
                  <h3 className="text-[32px] font-[600] mb-[16px]">Newsletters to select</h3>
                  <Checkbox setSelectedNewsletters={setSelectedNewsletters} selectedNewsletters={selectedNewsletters} />
                </div>

                <div className="max-w-[480px] basis-[50%] text-[#333]">
                  <h3 className="text-[32px] font-[600] mb-[16px]">Required Info</h3>
                  <form onSubmit={submit}>
                    <div className="flex flex-col gap-[3px] text-[14px] mb-[16px]">
                      <label>Your E-mail Address*</label>
                      <input
                        name="email"
                        type="email"
                        placeholder="required"
                        required
                        onChange={(e) =>
                          setSubscribeData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="px-[11px] py-[6px] border border-[#ccc] outline-none hover:border-[#333]"
                      />
                    </div>
                    <div className="flex flex-col gap-[3px] text-[14px] mb-[16px]">
                      <label>Username*</label>
                      <input
                        name="username"
                        type="text"
                        placeholder="optional"
                        required
                        onChange={(e) =>
                          setSubscribeData((prev) => ({
                            ...prev,
                            username: e.target.value,
                          }))
                        }
                        className="px-[11px] py-[6px] border border-[#ccc] outline-none hover:border-[#333]"
                      />
                    </div>
                    {Object.values(selectedNewsletters).includes(true) ? (
                      <input
                        type="submit"
                        className="bg-[#333] px-[24px] py-[10px] text-[#fff] text-[14px] font-[400] 
                rounded-[4px] h-[40px] w-[95px] flex justify-center items-center mb-[16px]"
                        value="Subscribe"
                      />
                    ) : (
                      <input
                        type="submit"
                        className="bg-[#333] px-[24px] py-[10px] text-[#fff] text-[14px] font-[400] 
                  rounded-[4px] h-[40px] w-[95px] flex justify-center items-center opacity-[0.5]"
                        value="Subscribe"
                        disabled
                      />
                    )}
                    {error && <div className="w-full flex justify-center">Given email address is already subscribed, thank you!</div>}
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center bg-green-400 py-[10px] px-[20px] text-[#fff] ">
                Thank you, your sign-up request was successful! Please check your email inbox to confirm.
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
