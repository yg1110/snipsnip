import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import { Editor } from '@toast-ui/react-editor';
import { useEffect, useRef } from 'react';

export interface BookmarkEditorProps {
  initialData?: string;
  value?: string;
  onChange?: (value: string) => void;
}
const BookmarkEditor = ({ initialData, value, onChange }: BookmarkEditorProps): JSX.Element => {
  const editorRef = useRef<ToastEditor>(null);

  const onEditorChange = () => {
    const data = editorRef.current?.getInstance().getHTML();
    onChange?.(data);
  };

  const onUploadImage = async (blob: Blob, callback: (imageUrl: string, imageType: string) => void) => {
    // const file = blobToFile(blob);
    // const result = await imageUploadApi.uploadImages([file as File]);
    // const url = result.images?.[0] ?? '';
    // callback(url, 'image');
  };

  useEffect(() => {
    if (initialData) {
      editorRef.current?.getInstance().setHTML(initialData);
    }
  }, [initialData, editorRef]);

  return (
    <>
      <Editor
        ref={editorRef}
        onChange={onEditorChange}
        initialValue={value || ' '}
        previewStyle="tab"
        height="500px"
        initialEditType="wysiwyg"
        hideModeSwitch={true}
        usageStatistics={false}
        plugins={[colorSyntax]}
        hooks={{ addImageBlobHook: onUploadImage }}
      />
    </>
  );
};

export default BookmarkEditor;
