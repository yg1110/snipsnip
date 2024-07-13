import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addFolder,
  deleteFolder,
  login,
  register,
  updateFolder,
} from "@/app/lib/data/fetchingData";
import { ModifiedFolder, NewFolder } from "@/app/lib/types/dataTypes";
import { LoginRequest, RegisterRequest } from "../types/userTypes";

export const useAddFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newFolder: NewFolder) => {
      return addFolder(newFolder);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["rootFolders"] }),
  });
};

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (modifiedFolder: ModifiedFolder) => {
      return updateFolder(modifiedFolder);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["rootFolders"] }),
  });
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderId: number) => {
      return deleteFolder(folderId);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["rootFolders"] }),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (command: LoginRequest) => {
      return login(command);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (command: RegisterRequest) => {
      return register(command);
    },
  });
};
