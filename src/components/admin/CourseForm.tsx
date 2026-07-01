"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import RichTextEditor from "./Richtexteditor";

import { CATEGORIES } from "@/types";
import { Course } from "@/features/course/courseApi";
import { createCourse, updateCourse } from "@/features/course/courseSlice";
import { useAppDispatch } from "@/redux/hooks";

import {
  X,
  Save,
  Plus,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  ImagePlus,
  Trash2,
  Loader2,
  Film,
} from "lucide-react";
import { uploadImageToImgbb } from "@/lib/uploadImageToImgbb";

type FormValues = {
  title: string;
  caption: string;
  description: string;
  videoUrl: string;
  category: string;
  subcategory: string;
};

interface CourseFormProps {
  mode: "add" | "edit";
  initialData?: Partial<Course>;
  onSuccess: (course: Course) => void;
  onCancel: () => void;
}

export default function CourseForm({
  mode,
  initialData,
  onSuccess,
  onCancel,
}: CourseFormProps) {
  const [descriptionHtml, setDescriptionHtml] = useState(
    initialData?.description || "",
  );
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [availableSubcategories, setAvailableSubs] = useState<string[]>([]);

  // Thumbnail state — file for new upload, string for existing URL
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string>(
    initialData?.thumbnail || "",
  );
  const [thumbDragging, setThumbDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: initialData?.title || "",
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
    setAvailableSubs(cat?.subcategories || []);
    if (!initialData?.subcategory) setValue("subcategory", "");
  }, [watchCategory, setValue, initialData?.subcategory]);

  // ── Thumbnail file handlers ────────────────────────────────────────────────
  const handleFileChange = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setServerError("Please upload a valid image file (JPG, PNG, WEBP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setServerError("Image must be smaller than 5 MB.");
      return;
    }
    setThumbFile(file);
    setThumbPreview(URL.createObjectURL(file));
    setServerError(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setThumbDragging(false);
    handleFileChange(e.dataTransfer.files?.[0] ?? null);
  };

  const removeThumbnail = () => {
    setThumbFile(null);
    setThumbPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleFormSubmit = async (data: FormValues) => {
    setServerError(null);

    // Validate thumbnail
    if (!thumbPreview && !thumbFile) {
      setServerError("Please upload a thumbnail image.");
      return;
    }

    // Validate description
    if (!descriptionHtml.replace(/<[^>]*>/g, "").trim()) {
      setServerError("Description is required.");
      return;
    }

    try {
      // Step 1: If a new file was selected, upload to imgbb and get URL
      let thumbnailUrl = initialData?.thumbnail || "";

      if (thumbFile) {
        setUploadingImage(true);
        try {
          thumbnailUrl = await uploadImageToImgbb(thumbFile);
        } catch (uploadErr: unknown) {
          const e = uploadErr as { message?: string };
          setServerError(
            e?.message || "Image upload failed. Check your IMGBB_API_KEY.",
          );
          setUploadingImage(false);
          return;
        } finally {
          setUploadingImage(false);
        }
      }

      // Step 2: Send JSON to your backend
      const payload = {
        title: data.title,
        caption: data.caption,
        description: descriptionHtml,
        videoUrl: data.videoUrl,
        category: data.category,
        subcategory: data.subcategory,
        thumbnail: thumbnailUrl,
      };

      let result: Course;

      if (mode === "add") {
        result = await dispatch(createCourse(payload)).unwrap();
      } else {
        result = await dispatch(
          updateCourse({
            id: initialData!._id!,
            data: payload,
          }),
        ).unwrap();
      }

      setSubmitStatus("success");
      setTimeout(() => {
        setSubmitStatus("idle");
        onSuccess(result);
      }, 1200);
    } catch (err: unknown) {
      const e = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const msg =
        e?.response?.data?.message || e?.message || "Something went wrong.";
      setServerError(msg);
      setSubmitStatus("error");
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all`;
  const inputStyle = {
    background: "var(--input)",
    border: "1px solid var(--border)",
    color: "var(--foreground)",
    fontFamily: "var(--font-body)",
  };
  const errorBorder = { border: "1px solid rgba(255,68,68,0.5)" };

  const isBusy = isSubmitting || uploadingImage;

  const submitLabel = () => {
    if (uploadingImage)
      return (
        <>
          <Loader2 size={15} className="animate-spin" /> Uploading image...
        </>
      );
    if (isSubmitting)
      return (
        <>
          <Loader2 size={15} className="animate-spin" /> Saving...
        </>
      );
    if (submitStatus === "success")
      return (
        <>
          <CheckCircle2 size={15} /> Saved!
        </>
      );
    if (mode === "add")
      return (
        <>
          <Plus size={15} /> Publish Video
        </>
      );
    return (
      <>
        <Save size={15} /> Update Video
      </>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b shrink-0 border-(--border) ">
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
              <Plus size={16} className="text-(--primary)" />
            ) : (
              <Save size={16} className="text-[#47c8e8]" />
            )}
          </div>
          <div>
            <h2 className="font-bold text-(--foreground) font-display">
              {mode === "add" ? "Add New Course" : "Edit Course"}
            </h2>
            <p className="text-xs text-(--muted-foreground)">
              {mode === "add"
                ? "Fill in the details to publish a new course"
                : `Editing: ${initialData?.title}`}
            </p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="p-2 rounded-xl transition-colors hover:opacity-70 text-(--muted-foreground) border border-(--border)"
        >
          <X size={16} />
        </button>
      </div>

      {/* ── Error banner ── */}
      {serverError && (
        <div className="mx-6 mt-4 flex items-center gap-3 px-4 py-3 rounded-xl text-sm shrink-0 border border-(--border) bg-[rgba(255,68,68,0.08)] text-[#ff6b6b]">
          <AlertCircle size={15} style={{ flexShrink: 0 }} />
          <span className="flex-1">{serverError}</span>
          <button
            onClick={() => setServerError(null)}
            className="flex cursor-pointer border-0 bg-transparent text-[#ff6b6b]"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* ── imgbb setup notice (only when no API key) ── */}
      {!process.env.NEXT_PUBLIC_IMGBB_API_KEY && (
        <div className="mx-6 mt-3 px-4 py-3 rounded-xl text-xs shrink-0 flex items-start gap-2 bg-[rgba(232,255,71,0.05)] border border-[rgba(232,255,71,0.15)] text-[#e8ff47]">
          <AlertCircle size={13} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>
            Add{" "}
            <code className="px-1 rounded bg-[rgba(255,255,255,0.08)]">
              NEXT_PUBLIC_IMGBB_API_KEY=your_key
            </code>{" "}
            to <code>.env.local</code> to enable image uploads. Get a free key
            at{" "}
            <a
              href="https://api.imgbb.com"
              target="_blank"
              rel="noreferrer"
              className="underline hover:opacity-70"
            >
              api.imgbb.com
            </a>
          </span>
        </div>
      )}

      {/* ── Form body ── */}
      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit(handleFormSubmit)} id="video-form">
          <div className="p-6 grid grid-cols-1 gap-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-(--muted-foreground) font-display">
                Title *
              </label>
              <input
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 5, message: "Min 5 characters" },
                })}
                className={inputClass}
                style={{ ...inputStyle, ...(errors.title ? errorBorder : {}) }}
                placeholder="e.g. Mastering React Hooks in 2024"
              />
              {errors.title && (
                <p className="text-xs mt-1 flex items-center gap-1 text-(--destructive)">
                  <AlertCircle size={10} />
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Caption */}
            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-(--muted-foreground) font-display">
                Caption *
              </label>
              <input
                {...register("caption", { required: "Caption is required" })}
                className={inputClass}
                style={{
                  ...inputStyle,
                  ...(errors.caption ? errorBorder : {}),
                }}
                placeholder="A short, catchy subtitle for your video"
              />
              {errors.caption && (
                <p className="text-xs mt-1 flex items-center gap-1 text-(--destructive)">
                  <AlertCircle size={10} />
                  {errors.caption.message}
                </p>
              )}
            </div>

            {/* Category + Subcategory */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-(--muted-foreground) font-display">
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
                    style={{
                      ...inputStyle,
                      ...(errors.category ? errorBorder : {}),
                    }}
                  >
                    <option value="">Select...</option>
                    {CATEGORIES.map((c) => (
                      <option key={c._id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-(--muted-foreground)"
                  />
                </div>
                {errors.category && (
                  <p className="text-xs mt-1 text-(--destructive)">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-(--muted-foreground) font-display">
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
                    style={{
                      ...inputStyle,
                      ...(errors.subcategory ? errorBorder : {}),
                      opacity: availableSubcategories.length === 0 ? 0.5 : 1,
                    }}
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-(--muted-foreground)"
                  />
                </div>
                {errors.subcategory && (
                  <p className="text-xs mt-1 text-(--destructive)">
                    {errors.subcategory.message}
                  </p>
                )}
              </div>
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-(--muted-foreground) font-display">
                Video URL *
              </label>
              <div className="relative">
                <LinkIcon
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-(--muted-foreground)"
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
                  style={{
                    ...inputStyle,
                    ...(errors.videoUrl ? errorBorder : {}),
                  }}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              {errors.videoUrl && (
                <p className="text-xs mt-1 flex items-center gap-1 text-(--destructive)">
                  <AlertCircle size={10} />
                  {errors.videoUrl.message}
                </p>
              )}
            </div>

            {/* Thumbnail upload */}
            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-(--muted-foreground) font-display">
                Thumbnail *
                <span
                  className="ml-2 normal-case font-normal"
                  style={{ color: "#4a4a4a" }}
                >
                  (image will be uploaded to imgbb)
                </span>
              </label>

              {thumbPreview ? (
                <div className="relative rounded-xl overflow-hidden aspect-video border border-(--border)">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbPreview}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[rgba(0,0,0,0.55)]">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[rgba(232,255,71,)0.15] text-[e8ff47] border border-(--border)"
                    >
                      <ImagePlus size={13} /> Change Image
                    </button>
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[rgba(255,68,68)0.12] text-[#ff6b6b] border border-(--border)"
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>

                  {/* File info */}
                  {thumbFile && (
                    <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs bg-black/70 text-white backdrop-blur-sm">
                      <Film size={10} className="shrink-0" />
                      <span className="flex-1 truncate">{thumbFile.name}</span>
                      <span className="text-[#8a8a8a] shrink-0">
                        {(thumbFile.size / 1024).toFixed(0)} KB
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setThumbDragging(true);
                  }}
                  onDragLeave={() => setThumbDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-3 rounded-xl cursor-pointer transition-all"
                  style={{
                    border: `2px dashed ${thumbDragging ? "#e8ff47" : "#2a2d35"}`,
                    background: thumbDragging
                      ? "rgba(232,255,71,0.04)"
                      : "var(--input)",
                    padding: "36px 20px",
                    minHeight: 160,
                  }}
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-2xl transition-all"
                    style={{
                      background: thumbDragging
                        ? "rgba(232,255,71,0.12)"
                        : "rgba(255,255,255,0.04)",
                      border: `1px solid ${thumbDragging ? "rgba(232,255,71,0.3)" : "#2a2d35"}`,
                    }}
                  >
                    <ImagePlus
                      size={20}
                      color={thumbDragging ? "#e8ff47" : "#4a4a4a"}
                    />
                  </div>
                  <div className="text-center">
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{
                        color: thumbDragging ? "#e8ff47" : "var(--foreground)",
                      }}
                    >
                      {thumbDragging
                        ? "Drop it here!"
                        : "Drop image or click to upload"}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      JPG, PNG, WEBP · Max 5 MB · 16:9 recommended
                    </p>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              />
            </div>

            {/* Description */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wider  text-(--muted-foreground) font-display">
                Description *
              </label>
              <RichTextEditor
                value={descriptionHtml}
                onChange={setDescriptionHtml}
                placeholder="Write a detailed course description..."
              />
              {!descriptionHtml.replace(/<[^>]*>/g, "").trim() &&
                isSubmitting && (
                  <p className="text-xs mt-1 flex items-center gap-1 text-(--destructive)">
                    <AlertCircle size={10} />
                    Description is required
                  </p>
                )}
            </div>
          </div>
        </form>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-between px-6 py-4 border-t shrink-0 border border-(--border) bg-(--card)">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80 border border-(--borde) text-(--muted-foreground)"
        >
          Cancel
        </button>

        <button
          type="submit"
          form="video-form"
          disabled={isBusy}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
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
          {submitLabel()}
        </button>
      </div>
    </div>
  );
}
