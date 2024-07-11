import { ModifiedFolder, NewFolder } from "@/app/lib/types/dataTypes";

export const fetchRootFolders = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/folders`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchChildFolders = async (parentFolderId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/folders/${parentFolderId}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const addFolder = async (newFolder: NewFolder) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/folders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFolder),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const updateFolder = async (modifiedFolder: ModifiedFolder) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/folders/${modifiedFolder.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/folders/${folderId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchBookmarks = async (folderId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/bookmarks/${folderId}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
