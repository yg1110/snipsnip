import { useQuery } from "@tanstack/react-query";
import {
  fetchBookmarks,
  fetchChildFolders,
  fetchRootFolders,
} from "@/app/lib/data/fetchingData";
import { Bookmark, Folder } from "@/app/lib/types/dataTypes";
import { ApiError } from "@/app/shared/ApiErrorGuard";
import { message } from "antd";

export const useRootFolders = () => {
  return useQuery<Folder[]>({
    queryKey: ["rootFolders"],
    queryFn: fetchRootFolders,
    retry(failureCount, error) {
      if (error instanceof ApiError) {
        const errorMessage =
          error?.message || "폴더 목록을 불러오는데 실패했습니다.";
        message.error(errorMessage);
        return false;
      }
      return failureCount < 2;
    },
  });
};

export const useChildFolders = (parentFolderId: number) => {
  return useQuery<Folder[]>({
    queryKey: ["childFolders", parentFolderId],
    queryFn: () => fetchChildFolders(parentFolderId),
    retry(failureCount, error) {
      if (error instanceof ApiError) {
        const errorMessage =
          error?.message || "하위 폴더 목록을 불러오는데 실패했습니다.";
        return false;
      }
      return failureCount < 2;
    },
  });
};

export const useBookmarks = (parentFolderId: number) => {
  return useQuery<Bookmark[]>({
    queryKey: ["bookmarks", parentFolderId],
    queryFn: () => fetchBookmarks(parentFolderId),
    retry(failureCount, error) {
      if (error instanceof ApiError) {
        const errorMessage =
          error?.message || "북마크 목록을 불러오는데 실패했습니다.";
        return false;
      }
      return failureCount < 2;
    },
  });
};
