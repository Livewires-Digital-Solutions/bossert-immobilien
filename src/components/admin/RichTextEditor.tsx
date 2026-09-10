'use client';

import React, { useCallback } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExt from '@tiptap/extension-link';
import ImageExt from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { uploadArticleImage } from '@/app/admin/articles/actions';
import styles from './RichTextEditor.module.css';

function Btn({
  editor,
  onClick,
  active,
  label,
  title,
}: {
  editor: Editor;
  onClick: () => void;
  active?: boolean;
  label: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      className={`${styles.tbBtn} ${active ? styles.tbActive : ''}`}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={!editor.isEditable}
    >
      {label}
    </button>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      LinkExt.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: 'noopener' } }),
      ImageExt.configure({ HTMLAttributes: { class: 'article-img' } }),
      Placeholder.configure({ placeholder: placeholder ?? 'Write the article…' }),
    ],
    content: value || '',
    editorProps: { attributes: { class: styles.prose } },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const addLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link URL', prev ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImageByUrl = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Image URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const uploadImage = useCallback(
    async (file: File) => {
      if (!editor) return;
      const fd = new FormData();
      fd.append('file', file);
      const res = await uploadArticleImage(fd);
      if (res.ok) editor.chain().focus().setImage({ src: res.url }).run();
      else window.alert(res.error);
    },
    [editor],
  );

  if (!editor) return <div className={styles.loading}>Loading editor…</div>;

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <Btn editor={editor} title="Bold" label={<b>B</b>} active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} />
        <Btn editor={editor} title="Italic" label={<i>I</i>} active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} />
        <span className={styles.tbSep} />
        <Btn editor={editor} title="Heading" label="H2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
        <Btn editor={editor} title="Subheading" label="H3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
        <span className={styles.tbSep} />
        <Btn editor={editor} title="Bullet list" label="•—" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} />
        <Btn editor={editor} title="Numbered list" label="1." active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
        <Btn editor={editor} title="Quote" label="&rdquo;" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
        <span className={styles.tbSep} />
        <Btn editor={editor} title="Link" label="Link" active={editor.isActive('link')} onClick={addLink} />
        <Btn editor={editor} title="Image from URL" label="Img URL" onClick={addImageByUrl} />
        <label className={styles.tbBtn} title="Upload image">
          Upload
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void uploadImage(f);
              e.target.value = '';
            }}
          />
        </label>
        <span className={styles.tbSep} />
        <Btn editor={editor} title="Undo" label="↺" onClick={() => editor.chain().focus().undo().run()} />
        <Btn editor={editor} title="Redo" label="↻" onClick={() => editor.chain().focus().redo().run()} />
      </div>
      <EditorContent editor={editor} className={styles.editor} />
    </div>
  );
}
