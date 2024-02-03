"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { data } from "@/constants/data";

function page() {
  const [investData, setInvestData] = useState([]);
  const [filterData, setFilterData] = useState(data);
  const [riskValue, setRiskValue] = useState("");
  const [industryValue, setIndustryValue] = useState("");
  const [tenureValue, setTenureValue] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setNoData(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (filterData) {
      let temp1 = [];
      let temp2 = [];
      filterData.forEach((d, idx) => {
        temp1.push(d);

        if ((idx + 1) % 3 === 0) {
          temp2 = [...temp2, temp1];
          temp1 = [];
        } else if (idx === filterData.length - 1) {
          temp2 = [...temp2, temp1];
        }
      });
      setInvestData([...temp2]);
    }
  }, [filterData]);

  useEffect(() => {
    if (
      riskValue !== "" ||
      industryValue !== "" ||
      tenureValue !== undefined ||
      minValue !== undefined ||
      maxValue !== undefined
    ) {
      let tempF = data;
      if (riskValue !== "") {
        tempF = tempF.filter((o) => o.risk === riskValue);
      }
      if (industryValue !== "") {
        tempF = tempF.filter((o) => o.industry === industryValue);
      }
      if (tenureValue !== "") {
        tempF = tempF.filter((o) => o.tenure === tenureValue);
      }
      if (minValue !== "") {
        tempF = tempF.filter((o) => o.size >= minValue);
      }
      if (maxValue !== "") {
        tempF = tempF.filter((o) => o.size <= maxValue);
      }
      setFilterData([...tempF]);
    }
  }, [riskValue, industryValue, tenureValue, minValue, maxValue]);

  const clearFilter = () => {
    setFilterData(data);

    setRiskValue("");
    setIndustryValue("");
    setTenureValue("");
    setMinValue("");
    setMaxValue("");
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-10">
        <CardTitle> INVESTMENT POOL</CardTitle>
      </div>
      <div className="flex items-center justify-center gap-4 mt-7 p-10 max-w-20">
        <div className="flex">
          FILTERS <Filter />{" "}
        </div>
        <Select value={riskValue} onValueChange={(e) => setRiskValue(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Risk" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="mid">Mid</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={industryValue}
          onValueChange={(e) => setIndustryValue(e)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Media">Media</SelectItem>
              <SelectItem value="Energy">Energy</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Software">Software</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={tenureValue} onValueChange={(e) => setTenureValue(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Tenure" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={1}>1 year</SelectItem>
              <SelectItem value={2}>2 years</SelectItem>
              <SelectItem value={3}>3 years</SelectItem>
              <SelectItem value={4}>4 years</SelectItem>
              <SelectItem value={5}>5 years</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={minValue} onValueChange={(e) => setMinValue(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select min price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={10}>10</SelectItem>
              <SelectItem value={50}>50</SelectItem>
              <SelectItem value={100}>100</SelectItem>
              <SelectItem value={150}>150</SelectItem>
              <SelectItem value={200}>200</SelectItem>
              <SelectItem value={250}>250</SelectItem>
              <SelectItem value={300}>300</SelectItem>
              <SelectItem value={350}>350</SelectItem>
              <SelectItem value={400}>400</SelectItem>
              <SelectItem value={450}>450</SelectItem>
              <SelectItem value={500}>500</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={maxValue} onValueChange={(e) => setMaxValue(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select max price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={10}>10</SelectItem>
              <SelectItem value={50}>50</SelectItem>
              <SelectItem value={100}>100</SelectItem>
              <SelectItem value={150}>150</SelectItem>
              <SelectItem value={200}>200</SelectItem>
              <SelectItem value={250}>250</SelectItem>
              <SelectItem value={300}>300</SelectItem>
              <SelectItem value={350}>350</SelectItem>
              <SelectItem value={400}>400</SelectItem>
              <SelectItem value={450}>450</SelectItem>
              <SelectItem value={500}>500</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className={cn(buttonVariants())} onClick={() => clearFilter()}>
          Clear filters
        </Button>
      </div>

      <div className="flex flex-col items-center mb-5">
        {investData.map((row, ridx) => (
          <div className="flex gap-5" key={ridx}>
            {row.map((i, idx) => (
              <Card className="w-[400px] mt-10 shadow-lg" key={idx}>
                <CardHeader>
                  <CardTitle>
                    <span className="ml-1">{i.name}</span>
                  </CardTitle>
                  <CardDescription>
                    Investment info random words.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div></div>
                  <div>
                    <span>Risk:</span>
                    <span className="ml-1">{i.risk}</span>
                  </div>
                  <div>
                    <span>Tenure:</span>
                    <span className="ml-1">{`${i.tenure} years`}</span>
                  </div>
                  <div>
                    <span>Industry:</span>
                    <span className="ml-1">{i.industry}</span>
                  </div>
                  <div>
                    <span>Size</span>
                    <span className="ml-1">{`Rs. ${i.size}`}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        {noData && investData.length === 0 ? (
          <div>No Data.. Please reset your filters</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default page;
