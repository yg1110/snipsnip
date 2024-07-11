import { useQuery } from "@tanstack/react-query";
import { fetchFolders } from "@/app/lib/data/fetchingData";
import { Folder } from "@/app/lib/types/dataTypes";

export const useFolders = () => {
  return useQuery<Folder[]>({
    queryKey: ["folders"],
    queryFn: fetchFolders,
  });
};
