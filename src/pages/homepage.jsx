import React, { useEffect, useState } from "react";
import axios from "axios";
import fileDownload from 'js-file-download';
import loading from '../assets/loading.gif';

export default function Homepage() {
  const [cogs, setCogs] = useState(null);
  const [sellingPrice, setSellingPrice] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const questionMarkTooltip = (text) => {
    return (
      <div className="relative">
        <svg className="w-5 h-5 peer cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
        </svg>
        <div className="w-48 hidden px-3 py-2 peer-hover:block transition-all absolute bg-[#4E8EE5] text-white rounded-lg font-normal mt-1 text-sm">
          {text}
        </div>
      </div>
    );
  }

  const calculateBreakEven = (cogs, sellingPrice) => {
    var breakEvenQuantity = cogs > 0 ? cogs / (sellingPrice - cogs) : 0;
    return breakEvenQuantity;
  }

  return (
    <>
      <div className="w-full h-full flex flex-col gap-5 items-center justify-center bg-transparent">
        <div className="flex flex-col gap-3 absolute w-full items-center justify-center">
          {/* <div className="grid gap-10 grid-cols-1 lg:grid-cols-2 px-5 w-full lg:w-[64rem]"> */}
          <div className="flex gap-10 flex-wrap px-5 w-full lg:w-[67rem]">
            <div className="flex-1">
              <h1 className="text-left w-full text-white text-4xl font-semibold">ROAS Calculator</h1>
              <p className="text-white mt-2">Enter your cost of goods and selling price to find out your breakeven ROAS (hover over the “?” on each value to learn more)</p>
              <div className="grid grid-cols-2 gap-5 mt-5 w-full">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-white text-xl flex gap-2 items-center">
                    COGS
                    {questionMarkTooltip("Cost of Goods/Service (COGS) is how much you will pay to get the product delivered to customers including any additional fees.")}
                  </p>
                  <div className="bg-[#4E8EE5] w-full bg-opacity-20 flex gap-5 rounded-lg py-3 px-5">
                    <input
                      onChange={(e) => { setCogs(e.target.value); }}
                      type="number"
                      className="w-full bg-transparent text-white px-2 rounded-lg outline-none placeholder-white placeholder-opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="Enter your cost..."
                      value={cogs}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-white text-xl flex gap-2 items-center">
                    Selling Price
                    {questionMarkTooltip("How much are you selling this product for?")}
                  </p>
                  <div className="bg-[#4E8EE5] w-full bg-opacity-20 flex gap-5 rounded-lg py-3 px-5">
                    <input
                      onChange={(e) => { setSellingPrice(e.target.value); }}
                      type="number"
                      className="w-full bg-transparent text-white px-2 rounded-lg outline-none placeholder-white placeholder-opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="Enter your cost..."
                      value={sellingPrice}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:flex-1 ">
              <h1 className="text-left w-full text-white text-2xl font-semibold">Know Your Break Even ROAS?</h1>
              <div className="grid grid-cols-3 gap-5 mt-5 w-full">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-white flex gap-2 items-center">
                    Cost Multiplier
                    {questionMarkTooltip("A cost multiplier is usually above 3 for low ticket dropshipping or in the range of 1 to 1.5 for high ticket dropshipping / service based businesses.")}
                  </p>
                  <div className="bg-[#4E8EE5] text-white text-center justify-center w-full bg-opacity-20 flex gap-5 rounded-lg py-3 px-5">
                    {(sellingPrice / cogs).toFixed(2)}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-white flex gap-2 items-center">
                    Profit Margin
                    {questionMarkTooltip("The profit margin is simply the selling price minus COGS (Cost of Goods and Services). The profit margin will tell you a lot: How much you will earn, how much you can spend on marketing, when you will break even and more. It is also know as the Break Even Point (BEP).")}
                  </p>
                  <div className="bg-[#4E8EE5] text-white text-center justify-center w-full bg-opacity-20 flex gap-5 rounded-lg py-3 px-5">
                    {(((sellingPrice - cogs) / sellingPrice) * 100).toFixed(2)}%
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-white flex gap-2 items-center">
                    B.E Roas
                    {questionMarkTooltip("Break Even ROAS (Return On Ad Spent) is the number to know. This will tell you if your marketing is profitable or not.Your product profit margin is not 100%. The BE ROAS will be the determining number for profitability. As long as your ROAS is above B.E ROAS, you are profitable.")}
                  </p>
                  <div className="bg-[#4E8EE5] text-white text-center justify-center w-full bg-opacity-20 flex gap-5 rounded-lg py-3 px-5">
                    {calculateBreakEven(cogs, sellingPrice).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

              {/* <div onClick={getVideo} className="transition-all cursor-pointer bg-opacity-80 hover:bg-opacity-100 flex items-center justify-center py-2 text-white bg-[#4E8EE5] rounded-lg px-6">
                <div className="h-8 flex items-center justify-center">
                  {isLoading ? <img className="w-8" src={loading} alt="loading..." /> : "Download"}
                </div>
              </div> */}
