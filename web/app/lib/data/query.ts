import { useQuery } from "@tanstack/react-query";
import {
  fetchBookmarks,
  fetchChildFolders,
  fetchRootFolders,
} from "@/app/lib/data/fetchingData";
import { Bookmark, Folder } from "@/app/lib/types/dataTypes";

export const useRootFolders = () => {
  return useQuery<Folder[]>({
    queryKey: ["rootFolders"],
    queryFn: fetchRootFolders,
  });
};

export const useChildFolders = (parentFolderId: number) => {
  return useQuery<Folder[]>({
    queryKey: ["childFolders", parentFolderId],
    queryFn: () => fetchChildFolders(parentFolderId),
  });
};

export const useBookmarks = (parentFolderId: number) => {
  return useQuery<Bookmark[]>({
    queryKey: ["bookmarks", parentFolderId],
    queryFn: () => fetchBookmarks(parentFolderId),
  });
};
