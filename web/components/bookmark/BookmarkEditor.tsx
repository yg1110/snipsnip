import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@/styles/editor.css';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import { Editor } from '@toast-ui/react-editor';
import { useRef } from 'react';

export interface BookmarkEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}
const BookmarkEditor = ({ value, onChange }: BookmarkEditorProps): JSX.Element => {
  const editorRef = useRef<ToastEditor>(null);

  const onEditorChange = () => {
    const editorInstance = editorRef.current?.getInstance();
    const html = editorInstance?.getHTML();
    if (html) {
      onChange?.(html);
    }
  };

  const onUploadImage = async (blob: Blob, callback: (imageUrl: string, imageType: string) => void) => {
    // const file = blobToFile(blob);
    // const result = await imageUploadApi.uploadImages([file as File]);
    // const url = result.images?.[0] ?? '';
    // callback(url, 'image');
  };

  return (
    <>
      <Editor
        ref={editorRef}
        onChange={onEditorChange}
        initialValue={value || ' '}
        previewStyle="vertical"
        height="28vh"
        initialEditType="wysiwyg"
        hideModeSwitch={true}
        useCommandShortcut={true}
        plugins={[colorSyntax]}
        hooks={{ addImageBlobHook: onUploadImage }}
      />
    </>
  );
};

export default BookmarkEditor;
