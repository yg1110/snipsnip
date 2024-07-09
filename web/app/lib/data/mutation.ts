import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addFolder,
  deleteFolder,
  updateFolder,
} from "@/app/lib/data/fetchingData";
import { ModifiedFolder, NewFolder } from "@/app/lib/types/dataTypes";

export const useAddFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newFolder: NewFolder) => {
      return addFolder(newFolder);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["folders"] }),
  });
};

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (modifiedFolder: ModifiedFolder) => {
      return updateFolder(modifiedFolder);
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
