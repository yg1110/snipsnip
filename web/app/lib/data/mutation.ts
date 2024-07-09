import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFolder, deleteFolder } from "@/app/lib/data/fetchingData";
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

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderId: number) => {
      return deleteFolder(folderId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["folders"] }),
  });
};
