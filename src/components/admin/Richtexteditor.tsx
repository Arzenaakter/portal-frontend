"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = forwardRef<{ getValue: () => string }, RichTextEditorProps>(
  function RichTextEditor({ value = "", onChange, placeholder = "Write a detailed description..." }, ref) {
    const editorRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null);
    const mounted = useRef(false);

    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (quillRef.current) {
          // @ts-ignore
          return quillRef.current.root.innerHTML;
        }
        return "";
      },
    }));

    useEffect(() => {
      if (mounted.current || !editorRef.current) return;
      mounted.current = true;

      // Dynamically load Quill
      const loadQuill = async () => {
        const Quill = (await import("quill")).default;

        // Import Quill CSS
        if (!document.getElementById("quill-css")) {
          const link = document.createElement("link");
          link.id = "quill-css";
          link.rel = "stylesheet";
          link.href = "https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css";
          document.head.appendChild(link);
        }

        if (!editorRef.current) return;

        const quill = new Quill(editorRef.current, {
          theme: "snow",
          placeholder,
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["blockquote", "code-block"],
              ["link"],
              ["clean"],
            ],
          },
        });

        // Set initial value
        if (value) {
          quill.clipboard.dangerouslyPasteHTML(value);
        }

        quill.on("text-change", () => {
          onChange?.(quill.root.innerHTML);
        });

        quillRef.current = quill;
      };

      loadQuill().catch(console.error);

      return () => {
        mounted.current = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sync value from outside (for update form pre-fill)
    useEffect(() => {
      if (quillRef.current && value) {
        // @ts-ignore
        const currentContent = quillRef.current.root.innerHTML;
        if (currentContent !== value && value !== "<p><br></p>") {
          // @ts-ignore
          quillRef.current.clipboard.dangerouslyPasteHTML(value);
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        <div ref={editorRef} style={{ minHeight: 200 }} />
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;