import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Lock, Unlock, Plus, X, Edit2, Trash2, ChevronLeft } from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import DOMPurify from 'dompurify';

const getFirestoreErrorMessage = (error, action = '작업') => {
  const normalizedMessage = `${error?.code ?? ''} ${error?.message ?? ''}`.toLowerCase();

  if (normalizedMessage.includes('firestore api has not been used') || normalizedMessage.includes('firestore.googleapis.com')) {
    return 'Cloud Firestore API가 아직 활성화되지 않았습니다. Firebase Console에서 Firestore Database를 생성하고, Google Cloud Console에서 Cloud Firestore API를 활성화한 뒤 다시 시도해주세요.';
  }

  if (normalizedMessage.includes('permission-denied')) {
    return `현재 Firebase 보안 규칙 때문에 ${action}에 실패했습니다. Firestore 규칙에서 이 프로젝트의 쓰기 권한을 확인해주세요.`;
  }

  if (normalizedMessage.includes('unavailable')) {
    return `Firebase 연결이 일시적으로 불안정해 ${action}에 실패했습니다. 잠시 후 다시 시도해주세요.`;
  }

  return `${action} 중 오류가 발생했습니다. ${error?.message ?? 'Firebase 설정을 확인해주세요.'}`;
};

const BlogBoard = () => {
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [viewPost, setViewPost] = useState(null);
  
  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentEditId, setCurrentEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const resetEditor = () => {
    setTitle('');
    setContent('');
    setCurrentEditId(null);
  };

  const startNewPost = () => {
    resetEditor();
    setViewPost(null);
    setIsEditing(true);
  };

  const fetchPosts = async () => {
    setLoading(true);
    setStatusMessage('');
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts: ", error);
      setStatusMessage(getFirestoreErrorMessage(error, '게시글 불러오기'));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
      setIsEditing(false);
      resetEditor();
    } else {
      const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD;

      if (!expectedPassword) {
        alert("관리자 비밀번호가 현재 배포 환경에 설정되지 않았습니다. Vercel 환경변수를 다시 확인해주세요.");
        return;
      }

      const password = window.prompt("블로그 관리자 비밀번호를 입력하세요:");
      if (password === expectedPassword) {
        setIsAdmin(true);
        startNewPost();
      } else if (password !== null) {
        alert("비밀번호가 틀렸습니다.");
      }
    }
  };

  const handleSavePost = async () => {
    if (!title.trim() || !content.trim() || content === '<p><br></p>') {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setIsSaving(true);
    setStatusMessage('');

    try {
      if (currentEditId) {
        await updateDoc(doc(db, 'posts', currentEditId), {
          title,
          content,
          updatedAt: new Date().toISOString()
        });
      } else {
        await addDoc(collection(db, 'posts'), {
          title,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      
      setIsEditing(false);
      setTitle('');
      setContent('');
      setCurrentEditId(null);
      await fetchPosts();
    } catch (error) {
      console.error("Error saving post: ", error);
      const message = getFirestoreErrorMessage(error, '게시글 저장');
      setStatusMessage(message);
      alert(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setCurrentEditId(post.id);
    setViewPost(null);
    setIsEditing(true);
  };

  const handleDelete = async (postId) => {
    if (window.confirm("정말 이 게시물을 삭제하시겠습니까?")) {
      try {
        setStatusMessage('');
        await deleteDoc(doc(db, 'posts', postId));
        if (viewPost?.id === postId) setViewPost(null);
        await fetchPosts();
      } catch (error) {
        console.error("Error deleting post: ", error);
        const message = getFirestoreErrorMessage(error, '게시글 삭제');
        setStatusMessage(message);
        alert(message);
      }
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const sanitizeBlogContent = (html) => DOMPurify.sanitize(html, {
    ADD_TAGS: ['video', 'source'],
    ADD_ATTR: ['controls', 'playsinline', 'preload', 'src', 'poster', 'class', 'type'],
  });

  // Editor View
  if (isEditing) {
    return (
      <div className="flex flex-col min-h-[720px] animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-text">{currentEditId ? '게시글 수정' : '새 게시글 작성'}</h3>
            <p className="mt-1 text-sm text-muted">글자 크기, 폰트, 색상, 링크, 이미지, 영상 업로드까지 바로 사용할 수 있습니다.</p>
          </div>
          <button 
            onClick={() => {
              setIsEditing(false);
              resetEditor();
            }}
            className="p-2 text-muted hover:text-text hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <input 
          type="text" 
          placeholder="제목을 입력하세요"
          className="w-full bg-background border border-border text-text px-4 py-3 rounded-lg mb-4 focus:outline-none focus:border-primary transition-colors text-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <div className="flex-1 mb-4 flex flex-col">
          {statusMessage && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {statusMessage}
            </div>
          )}
          <RichTextEditor value={content} onChange={setContent} />
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <p className="text-sm text-muted">본문에 이미지를 넣으려면 툴바의 이미지 아이콘을, 영상을 넣으려면 비디오 아이콘을 사용하세요.</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsEditing(false);
                resetEditor();
              }}
              className="px-4 py-2 border border-border rounded-lg font-medium text-text hover:border-primary/40 hover:text-primary transition-colors"
            >
              취소
            </button>
            <button 
              onClick={handleSavePost}
              disabled={isSaving}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? '저장 중...' : currentEditId ? '수정 완료' : '등록하기'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Reader View
  if (viewPost) {
    return (
      <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
        <button 
          onClick={() => setViewPost(null)}
          className="flex items-center gap-1 text-muted hover:text-text transition-colors self-start mb-4 text-sm font-medium"
        >
          <ChevronLeft size={16} /> 목록으로 돌아가기
        </button>
        
        <div className="bg-white/5 border border-border rounded-xl p-6 overflow-y-auto custom-scrollbar flex-1 relative group">
          <h2 className="text-2xl font-bold text-text mb-2 pr-12">{viewPost.title}</h2>
          <p className="text-xs text-muted mb-6">{formatDate(viewPost.createdAt)}</p>
          
          <div 
            className="prose prose-invert max-w-none text-text/90 prose-p:leading-relaxed prose-a:text-primary prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: sanitizeBlogContent(viewPost.content) }}
          />

          {isAdmin && (
            <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(viewPost)} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors backdrop-blur-sm">
                <Edit2 size={14} />
              </button>
              <button onClick={() => handleDelete(viewPost.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors backdrop-blur-sm">
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2 text-text">
          Blog
          <button 
            onClick={handleAdminToggle} 
            className="p-1.5 text-muted hover:text-text rounded-md hover:bg-white/5 transition-all outline-none"
            title={isAdmin ? "관리자 로그아웃" : "관리자 로그인"}
          >
            {isAdmin ? <Unlock size={16} className="text-primary" /> : <Lock size={16} />}
          </button>
        </h3>
        
        {isAdmin && (
          <button 
            onClick={startNewPost}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-md transition-colors text-sm font-medium"
          >
            <Plus size={16} /> 새 게시글
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
        {statusMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {statusMessage}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted space-y-2">
            <p>아직 작성된 글이 없습니다.</p>
          </div>
        ) : (
          posts.map(post => (
            <div 
              key={post.id} 
              onClick={() => setViewPost(post)}
              className="group p-4 rounded-xl border border-border bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all cursor-pointer relative"
            >
              <h4 className="font-semibold text-text mb-1 group-hover:text-primary transition-colors pr-16 truncate">
                {post.title}
              </h4>
              <p className="text-xs text-muted">
                {formatDate(post.createdAt)}
              </p>
              
              {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => handleEdit(post)} className="p-1.5 text-muted hover:text-white hover:bg-white/10 rounded-md transition-colors">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="p-1.5 text-muted hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogBoard;
