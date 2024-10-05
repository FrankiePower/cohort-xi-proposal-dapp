"use client";

import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { formatEther } from "ethers";
import useVoteProposal from "../hooks/useVote";
import React, { useState, useEffect } from "react";

const Proposal = ({
  id,
  count,
  description,
  amount,
  minRequiredVote,
  votecount,
  deadline,
  executed,
}) => {
  const handleVote = useVoteProposal();

  const [buttonColor, setButtonColor] = useState("blue");

  const [text, setText] = useState("Vote");

  useEffect(() => {
    if (votecount > minRequiredVote) {
      setButtonColor("red");
      setText("Execute");
    } else {
      setButtonColor("blue");
      setText("Vote");
    }
  }, [votecount, minRequiredVote]);

  return (
    <div>
      <Box className="bg-white text-black border rounded-md p-4 w-[464px] justify-around">
        <div className="flex justify-center">
          <Text className=" mt-2 text-4xl mb-4">Proposal: {count}</Text>
        </div>
        <Box className="w-full flex flex-col gap-4">
          <Flex className="flex gap-4">
            <Text>Description:</Text>
            <Text className="font-bold">{description}</Text>
          </Flex>
          <Flex className="flex gap-4">
            <Text>Amount:</Text>
            <Text className="font-bold">{formatEther(amount)} ETH</Text>
          </Flex>
          <Flex className="flex gap-4">
            <Text>Required Vote:</Text>
            <Text className="font-bold">{Number(minRequiredVote)}</Text>
          </Flex>
          <Flex className="flex gap-4">
            <Text>Vote Count:</Text>
            <Text className="font-bold">{Number(votecount)}</Text>
          </Flex>
          <Flex className="flex gap-4">
            <Text>Deadline:</Text>
            <Text className="font-bold">
              {new Date(Number(deadline) * 1000).toLocaleDateString()}
            </Text>
          </Flex>
          <Flex className="flex gap-4">
            <Text>Executed:</Text>
            <Text className="font-bold">{String(executed)}</Text>
          </Flex>
        </Box>
        <Button
          style={{ backgroundColor: buttonColor }}
          onClick={() => handleVote(id, votecount, minRequiredVote)}
          className=" text-white font-bold w-full mt-4 p-4 rounded-md shadow-sm"
        >
          {text}
        </Button>
      </Box>
    </div>
  );
};

export default Proposal;
