import { Flex, Text } from "@radix-ui/themes";
import Proposal from "./Proposal";

const Proposals = ({ proposals }) => {
  return (
    <Flex className="w-full flex gap-4 flex-wrap justify-evenly">
      {proposals.length === 0 ? (
        <Text>No data to display</Text>
      ) : (
        proposals.map(
          ({
            id,
            count,
            deadline,
            minRequiredVote,
            amount,
            description,
            executed,
            votecount,
          }) => (
            <Proposal
              key={`${deadline}${minRequiredVote}`}
              count={count}
              id={id}
              amount={amount}
              deadline={deadline}
              description={description}
              executed={executed}
              minRequiredVote={minRequiredVote}
              votecount={votecount}
            />
          )
        )
      )}
    </Flex>
  );
};

export default Proposals;
