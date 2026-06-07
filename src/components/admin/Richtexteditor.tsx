"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = forwardRef<
  { getValue: () => string },
  RichTextEditorProps
>(function RichTextEditor(
  { value = "", onChange, placeholder = "Write a detailed description..." },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValue: () => {
      if (quillRef.current) {
        return quillRef.current.root.innerHTML;
      }
      return "";
    },
  }));

  useEffect(() => {
    if (!editorRef.current) return;

    // Use a local variable to capture the ref element for cleanup stability
    const editorContainer = editorRef.current;
    type QuillInstance = {
      root: { innerHTML: string };
      clipboard: { dangerouslyPasteHTML: (html: string) => void };
      on: (event: string, handler: () => void) => void;
    };

    let quillInstance: QuillInstance | null = null;

    const loadQuill = async () => {
      const Quill = (await import("quill")).default;

      // Import Quill CSS safely
      if (!document.getElementById("quill-css")) {
        const link = document.createElement("link");
        link.id = "quill-css";
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css";
        document.head.appendChild(link);
      }

      // Check if Quill has already been initialized on this element
      if (editorContainer.classList.contains("ql-container")) return;

      quillInstance = new Quill(editorContainer, {
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

      const currentQuill = quillInstance;

      if (value) {
        currentQuill.clipboard.dangerouslyPasteHTML(value);
      }

      currentQuill.on("text-change", () => {
        onChange?.(currentQuill.root.innerHTML);
      });

      quillRef.current = currentQuill;
    };

    loadQuill().catch(console.error);

    // CLEANUP: Wipe out DOM changes when unmounting
    return () => {
      quillRef.current = null;
      if (editorContainer) {
        // Clear inner HTML to remove Quill's inner wrapper classes
        editorContainer.innerHTML = "";
        // Remove Quill layout classes added to the target div
        editorContainer.className = "";
      }
      // Remove the toolbar element that Quill injected into the parent wrapper
      if (containerRef.current) {
        const toolbar = containerRef.current.querySelector(".ql-toolbar");
        if (toolbar) {
          toolbar.remove();
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync value from outside
  useEffect(() => {
    if (quillRef.current && value) {
      const currentContent = quillRef.current.root.innerHTML;
      if (currentContent !== value && value !== "<p><br></p>") {
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
      }
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      <div ref={editorRef} style={{ minHeight: 200 }} />
    </div>
  );
});

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
