"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Video, CATEGORIES } from "@/types";
import RichTextEditor from "./Richtexteditor";
import {
  X,
  Upload,
  Link as LinkIcon,
  Save,
  Plus,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type FormValues = {
  title: string;
  thumbnail: string;
  caption: string;
  description: string;
  videoUrl: string;
  category: string;
  subcategory: string;
};

interface VideoFormProps {
  mode: "add" | "edit";
  initialData?: Partial<Video>;
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
}

export default function Videoform({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: VideoFormProps) {
  const [descriptionHtml, setDescriptionHtml] = useState(
    initialData?.description || "",
  );
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [availableSubcategories, setAvailableSubcategories] = useState<
    string[]
  >([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: initialData?.title || "",
      thumbnail: initialData?.thumbnail || "",
      caption: initialData?.caption || "",
      description: initialData?.description || "",
      videoUrl: initialData?.videoUrl || "",
      category: initialData?.category || "",
      subcategory: initialData?.subcategory || "",
    },
  });

  const watchCategory = watch("category");

  useEffect(() => {
    const cat = CATEGORIES.find((c) => c.name === watchCategory);
    setAvailableSubcategories(cat?.subcategories || []);
    if (!initialData?.subcategory) setValue("subcategory", "");
  }, [watchCategory, setValue, initialData?.subcategory]);

  const thumbnailUrl = watch("thumbnail");

  const handleFormSubmit = async (data: FormValues) => {
    data.description = descriptionHtml;
    try {
      await onSubmit(data);
      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus("idle"), 2000);
    } catch {
      setSubmitStatus("error");
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2`;
  const inputStyle = {
    background: "var(--input)",
    border: "1px solid var(--border)",
    color: "var(--foreground)",
    fontFamily: "var(--font-body)",
  };
  const focusStyle = {
    "--tw-ring-color": "rgba(232,255,71,0.3)",
  } as React.CSSProperties;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background:
                mode === "add"
                  ? "rgba(232,255,71,0.1)"
                  : "rgba(71,200,232,0.1)",
            }}
          >
            {mode === "add" ? (
              <Plus size={16} style={{ color: "var(--primary)" }} />
            ) : (
              <Save size={16} style={{ color: "#47c8e8" }} />
            )}
          </div>
          <div>
            <h2
              className="font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--foreground)",
              }}
            >
              {mode === "add" ? "Add New Video" : "Edit Video"}
            </h2>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              {mode === "add"
                ? "Fill in the details to publish a new course video"
                : `Editing: ${initialData?.title}`}
            </p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="p-2 rounded-xl transition-colors hover:opacity-70"
          style={{
            color: "var(--muted-foreground)",
            border: "1px solid var(--border)",
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Form body */}
      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit(handleFormSubmit)} id="video-form">
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="flex flex-col gap-5">
              {/* Title */}
              <div>
                <label
                  className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Title *
                </label>
                <input
                  {...register("title", {
                    required: "Title is required",
                    minLength: { value: 5, message: "Min 5 characters" },
                  })}
                  className={inputClass}
                  style={{ ...inputStyle, ...focusStyle }}
                  placeholder="e.g. Mastering React Hooks in 2024"
                />
                {errors.title && (
                  <p
                    className="text-xs mt-1 flex items-center gap-1"
                    style={{ color: "var(--destructive)" }}
                  >
                    <AlertCircle size={10} />
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Caption */}
              <div>
                <label
                  className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Caption *
                </label>
                <input
                  {...register("caption", { required: "Caption is required" })}
                  className={inputClass}
                  style={{ ...inputStyle, ...focusStyle }}
                  placeholder="A short, catchy subtitle for your video"
                />
                {errors.caption && (
                  <p
                    className="text-xs mt-1 flex items-center gap-1"
                    style={{ color: "var(--destructive)" }}
                  >
                    <AlertCircle size={10} />
                    {errors.caption.message}
                  </p>
                )}
              </div>

              {/* Category + Subcategory */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                    style={{
                      color: "var(--muted-foreground)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Category *
                  </label>
                  <div className="relative">
                    <select
                      {...register("category", {
                        required: "Category is required",
                      })}
                      className={
                        inputClass + " appearance-none cursor-pointer pr-9"
                      }
                      style={{ ...inputStyle, ...focusStyle }}
                    >
                      <option value="">Select...</option>
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: "var(--muted-foreground)" }}
                    />
                  </div>
                  {errors.category && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--destructive)" }}
                    >
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                    style={{
                      color: "var(--muted-foreground)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Subcategory *
                  </label>
                  <div className="relative">
                    <select
                      {...register("subcategory", {
                        required: "Subcategory is required",
                      })}
                      className={
                        inputClass + " appearance-none cursor-pointer pr-9"
                      }
                      style={{ ...inputStyle, ...focusStyle }}
                      disabled={availableSubcategories.length === 0}
                    >
                      <option value="">Select...</option>
                      {availableSubcategories.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: "var(--muted-foreground)" }}
                    />
                  </div>
                  {errors.subcategory && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--destructive)" }}
                    >
                      {errors.subcategory.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Video URL */}
              <div>
                <label
                  className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Video URL *
                </label>
                <div className="relative">
                  <LinkIcon
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: "var(--muted-foreground)" }}
                  />
                  <input
                    {...register("videoUrl", {
                      required: "Video URL is required",
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: "Must be a valid URL",
                      },
                    })}
                    className={inputClass + " pl-9"}
                    style={{ ...inputStyle, ...focusStyle }}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
                {errors.videoUrl && (
                  <p
                    className="text-xs mt-1 flex items-center gap-1"
                    style={{ color: "var(--destructive)" }}
                  >
                    <AlertCircle size={10} />
                    {errors.videoUrl.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              {/* Thumbnail URL */}
              <div>
                <label
                  className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Thumbnail URL *
                </label>
                <div className="relative">
                  <Upload
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: "var(--muted-foreground)" }}
                  />
                  <input
                    {...register("thumbnail", {
                      required: "Thumbnail is required",
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: "Must be a valid URL",
                      },
                    })}
                    className={inputClass + " pl-9"}
                    style={{ ...inputStyle, ...focusStyle }}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {errors.thumbnail && (
                  <p
                    className="text-xs mt-1 flex items-center gap-1"
                    style={{ color: "var(--destructive)" }}
                  >
                    <AlertCircle size={10} />
                    {errors.thumbnail.message}
                  </p>
                )}

                {/* Thumbnail preview */}
                {thumbnailUrl && /^https?:\/\/.+/.test(thumbnailUrl) && (
                  <div
                    className="mt-3 rounded-xl overflow-hidden aspect-video relative"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbnailUrl}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none">
                      <span
                        className="text-xs px-2 py-0.5 rounded-md font-medium"
                        style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}
                      >
                        Preview
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description - full width */}
            <div className="lg:col-span-2">
              <label
                className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Description *
              </label>
              <RichTextEditor
                value={descriptionHtml}
                onChange={setDescriptionHtml}
                placeholder="Write a detailed course description..."
              />
              {!descriptionHtml.replace(/<[^>]*>/g, "").trim() &&
                isSubmitting && (
                  <p
                    className="text-xs mt-1 flex items-center gap-1"
                    style={{ color: "var(--destructive)" }}
                  >
                    <AlertCircle size={10} />
                    Description is required
                  </p>
                )}
            </div>
          </div>
        </form>
      </div>

      {/* Footer actions */}
      <div
        className="flex items-center justify-between px-6 py-4 border-t flex-shrink-0"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
          style={{
            color: "var(--muted-foreground)",
            border: "1px solid var(--border)",
          }}
        >
          Cancel
        </button>

        <button
          type="submit"
          form="video-form"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          style={{
            background:
              submitStatus === "success"
                ? "#4ade80"
                : mode === "add"
                  ? "var(--primary)"
                  : "#47c8e8",
            color: "black",
            fontFamily: "var(--font-display)",
          }}
        >
          {submitStatus === "success" ? (
            <>
              <CheckCircle2 size={16} /> Saved!
            </>
          ) : isSubmitting ? (
            <span>Saving...</span>
          ) : mode === "add" ? (
            <>
              <Plus size={16} /> Publish Video
            </>
          ) : (
            <>
              <Save size={16} /> Update Video
            </>
          )}
        </button>
      </div>
    </div>
  );
}
