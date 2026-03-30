import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { LoaderCircle } from 'lucide-react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../lib/firebase';
import 'quill/dist/quill.snow.css';

const fontOptions = ['sans', 'serif', 'monospace', 'arial', 'georgia', 'times-new-roman', 'verdana'];
const Font = Quill.import('formats/font');
Font.whitelist = fontOptions;
Quill.register(Font, true);

const BlockEmbed = Quill.import('blots/block/embed');

class UploadedVideoBlot extends BlockEmbed {
  static blotName = 'uploadedVideo';
  static tagName = 'video';
  static className = 'blog-uploaded-video';

  static create(value) {
    const node = super.create();
    const src = typeof value === 'string' ? value : value?.url;

    node.setAttribute('controls', 'controls');
    node.setAttribute('playsinline', 'true');
    node.setAttribute('preload', 'metadata');
    node.setAttribute('src', src);

    return node;
  }

  static value(node) {
    return {
      url: node.getAttribute('src'),
    };
  }
}

if (!Quill.imports['formats/uploadedVideo']) {
  Quill.register(UploadedVideoBlot);
}

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  [{ font: fontOptions }, { size: ['small', false, 'large', 'huge'] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ['blockquote', 'code-block', 'link', 'image', 'video'],
  ['clean'],
];

const normalizeEditorHtml = (html) => (
  !html || html === '<p><br></p>' ? '' : html
);

const RichTextEditor = ({ value, onChange }) => {
  const quillInstanceRef = useRef(null);
  const editorElementRef = useRef(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const applyingExternalValueRef = useRef(false);
  const onChangeRef = useRef(onChange);
  const [uploadingLabel, setUploadingLabel] = useState('');
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const insertMediaAtCursor = (type, url) => {
    const quill = quillInstanceRef.current;

    if (!quill) {
      return;
    }

    const range = quill.getSelection(true) ?? { index: quill.getLength(), length: 0 };

    if (type === 'image') {
      quill.insertEmbed(range.index, 'image', url, 'user');
    } else {
      quill.insertEmbed(range.index, 'uploadedVideo', { url }, 'user');
    }

    quill.insertText(range.index + 1, '\n', 'user');
    quill.setSelection(range.index + 2, 0, 'user');
  };

  const uploadFile = async (file, type) => {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const storageRef = ref(storage, `blog/${type}s/${Date.now()}-${safeName}`);
    await uploadBytes(storageRef, file, { contentType: file.type });
    return getDownloadURL(storageRef);
  };

  const handleMediaSelection = async (event, type) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    setUploadError('');
    setUploadingLabel(type === 'image' ? '이미지를 업로드하는 중입니다...' : '영상을 업로드하는 중입니다...');

    try {
      const url = await uploadFile(file, type);
      insertMediaAtCursor(type, url);
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      setUploadError(type === 'image' ? '이미지 업로드에 실패했습니다.' : '영상 업로드에 실패했습니다.');
    } finally {
      setUploadingLabel('');
    }
  };

  const resetEditorHost = () => {
    const host = editorElementRef.current;

    if (!host) {
      return;
    }

    const shell = host.parentElement;
    shell?.querySelectorAll(':scope > .ql-toolbar').forEach((toolbar) => toolbar.remove());

    host.innerHTML = '';
    host.className = 'blog-editor';
  };

  useEffect(() => {
    if (!editorElementRef.current || quillInstanceRef.current) {
      return undefined;
    }

    resetEditorHost();

    const quill = new Quill(editorElementRef.current, {
      theme: 'snow',
      placeholder: '제목 아래에 본문을 작성하세요.',
      modules: {
        toolbar: {
          container: toolbarOptions,
          handlers: {
            image: () => imageInputRef.current?.click(),
            video: () => videoInputRef.current?.click(),
          },
        },
      },
    });

    const initialValue = normalizeEditorHtml(value);

    if (initialValue) {
      applyingExternalValueRef.current = true;
      quill.clipboard.dangerouslyPasteHTML(initialValue, 'api');
      applyingExternalValueRef.current = false;
    }

    const handleTextChange = () => {
      if (applyingExternalValueRef.current) {
        return;
      }

      onChangeRef.current(normalizeEditorHtml(quill.root.innerHTML));
    };

    quill.on('text-change', handleTextChange);

    quillInstanceRef.current = quill;

    return () => {
      quill.off('text-change', handleTextChange);
      quillInstanceRef.current = null;
      resetEditorHost();
    };
  }, []);

  useEffect(() => {
    const quill = quillInstanceRef.current;

    if (!quill) {
      return;
    }

    const nextValue = normalizeEditorHtml(value);
    const currentValue = normalizeEditorHtml(quill.root.innerHTML);

    if (nextValue === currentValue) {
      return;
    }

    applyingExternalValueRef.current = true;

    if (nextValue) {
      quill.clipboard.dangerouslyPasteHTML(nextValue, 'api');
    } else {
      quill.setText('');
    }

    applyingExternalValueRef.current = false;
  }, [value]);

  return (
    <div className="blog-editor-shell border border-border rounded-2xl overflow-hidden bg-white shadow-sm">
      <div className="border-b border-border bg-[#f8f8fc] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-text">블로그 에디터</p>
          <p className="text-xs text-muted mt-1">폰트, 글자 크기, 강조, 색상, 링크, 이미지, 영상 업로드를 지원합니다.</p>
        </div>
      </div>

      {(uploadingLabel || uploadError) && (
        <div className={`flex items-center gap-2 px-4 py-3 text-sm ${uploadError ? 'bg-red-50 text-red-600' : 'bg-primary/5 text-primary'}`}>
          {uploadingLabel && <LoaderCircle size={16} className="animate-spin" />}
          <span>{uploadError || uploadingLabel}</span>
        </div>
      )}

      <div ref={editorElementRef} className="blog-editor" />

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleMediaSelection(event, 'image')}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(event) => handleMediaSelection(event, 'video')}
      />
    </div>
  );
};

export default RichTextEditor;
