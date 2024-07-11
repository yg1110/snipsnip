import { ModifiedFolder, NewFolder } from "@/app/lib/types/dataTypes";
import Cookies from "js-cookie";

export const fetchRootFolders = async () => {
  const accessToken = Cookies.get("accessToken");
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/folders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchChildFolders = async (parentFolderId: number) => {
  const accessToken = Cookies.get("accessToken");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/folders/${parentFolderId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const addFolder = async (newFolder: NewFolder) => {
  const accessToken = Cookies.get("accessToken");
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/folders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(newFolder),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const updateFolder = async (modifiedFolder: ModifiedFolder) => {
  const accessToken = Cookies.get("accessToken");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/folders/${modifiedFolder.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(modifiedFolder),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const deleteFolder = async (folderId: number) => {
  const accessToken = Cookies.get("accessToken");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/folders/${folderId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchBookmarks = async (folderId: number) => {
  const accessToken = Cookies.get("accessToken");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/bookmarks/${folderId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
