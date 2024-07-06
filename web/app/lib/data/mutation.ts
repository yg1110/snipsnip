import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFolder } from "@/app/lib/data/fetchingData";
import { NewFolder } from "@/app/lib/types/dataTypes";

export const useAddFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newFolder: NewFolder) => {
      return addFolder(newFolder);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["folders"] }),
  });
};
