"use client";

import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/hono-rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<
  (typeof api.document.branch)[":documentId"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof api.document.branch)[":documentId"]["$post"]
>["json"];

const useBranchDocument = (documentId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await api.document.branch[":documentId"]["$post"]({
        param: {
          documentId,
        },
        json,
      });
      return await response.json();
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["document"],
      });
      if ("data" in response && response.data) {
        toast({
          title: "Branch Created",
          description: "Resume branched successfully. Redirecting...",
        });
        router.push(`/dashboard/document/${response.data.documentId}/edit`);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to branch resume",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useBranchDocument;
