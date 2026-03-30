import React, { useRef, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import { ImagePlus, LoaderCircle, Video } from 'lucide-react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../lib/firebase';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [uploadingLabel, setUploadingLabel] = useState('');
  const [uploadError, setUploadError] = useState('');

  const insertMediaAtCursor = (type, url, fileName) => {
    const quill = quillRef.current?.getEditor();

    if (!quill) {
      return;
    }

    const range = quill.getSelection(true) ?? { index: quill.getLength(), length: 0 };

    if (type === 'image') {
      quill.insertEmbed(range.index, 'image', url, 'user');
      quill.setSelection(range.index + 1, 0, 'user');
      return;
    }

    const safeName = fileName.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    quill.clipboard.dangerouslyPasteHTML(
      range.index,
      [
        '<p>',
        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="blog-video-link">`,
        `${safeName} 영상 보기`,
        '</a>',
        '</p>',
      ].join(''),
      'user'
    );
    quill.setSelection(range.index + 1, 0, 'user');
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
      insertMediaAtCursor(type, url, file.name);
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      setUploadError(type === 'image' ? '이미지 업로드에 실패했습니다.' : '영상 업로드에 실패했습니다.');
    } finally {
      setUploadingLabel('');
    }
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      handlers: {
        image: () => imageInputRef.current?.click(),
        video: () => videoInputRef.current?.click(),
      },
    },
  }), []);

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'color',
    'background',
    'align',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-[#f8f8fc] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-text">블로그 에디터</p>
          <p className="text-xs text-muted">헤더, 폰트, 크기, 강조, 색상, 링크, 이미지, 영상 업로드를 지원합니다.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text hover:border-primary/40 hover:text-primary transition-colors"
          >
            <ImagePlus size={16} />
            이미지 업로드
          </button>
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text hover:border-primary/40 hover:text-primary transition-colors"
          >
            <Video size={16} />
            영상 업로드
          </button>
        </div>
      </div>

      {(uploadingLabel || uploadError) && (
        <div className={`flex items-center gap-2 px-4 py-3 text-sm ${uploadError ? 'bg-red-50 text-red-600' : 'bg-primary/5 text-primary'}`}>
          {uploadingLabel && <LoaderCircle size={16} className="animate-spin" />}
          <span>{uploadError || uploadingLabel}</span>
        </div>
      )}

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="제목 아래에 본문을 작성하세요."
        className="blog-editor"
      />

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
