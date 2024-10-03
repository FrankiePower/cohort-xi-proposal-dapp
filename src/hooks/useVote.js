import { useCallback } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitNetwork } from "@reown/appkit/react";
import { liskSepoliaNetwork } from "../connection";

const useVoteProposal = () => {
  const contract = useContract(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(
    async (_proposalId) => {
      if (!address) {
        toast.error("Connect your wallet!");
        return;
      }
      if (Number(chainId) !== liskSepoliaNetwork.chainId) {
        toast.error("You are not connected to the right network");
        return;
      }

      if (!contract) {
        toast.error("Cannot get contract!");
        return;
      }

      if (!_proposalId) {
        toast.error("No Proposal ID!");
        return;
      }

      try {
        const estimatedGas = await contract.vote.estimateGas(_proposalId);
        const tx = await contract.vote(_proposalId, {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        });

        const reciept = await tx.wait();

        if (reciept.status === 1) {
          toast.success("Voting successful");
          return;
        }
        toast.error("Voting failed");
        return;
      } catch (error) {
        console.error("error while registering vote: ", error);
        toast.error("Register Vote error");
      }
    },
    [address, chainId, contract]
  );
};

export default useVoteProposal;
