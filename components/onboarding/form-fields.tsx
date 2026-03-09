"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useCallback, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BaseFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  className?: string;
  description?: string;
}

interface TextFormFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  type?: string;
  placeholder?: string;
}

export function TextFormField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  className,
  description,
}: TextFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              onChange={(e) => {
                field.onChange(type === "number" ? (e.target.value === "" ? "" : e.target.valueAsNumber) : e.target.value);
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface SelectFormFieldProps<T extends FieldValues>
  extends BaseFieldProps<T> {
  options: readonly { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}

export function SelectFormField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  disabled,
  className,
  description,
}: SelectFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value} disabled={disabled}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface TextareaFormFieldProps<T extends FieldValues>
  extends BaseFieldProps<T> {
  placeholder?: string;
  rows?: number;
}

export function TextareaFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  rows = 3,
  className,
  description,
}: TextareaFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} rows={rows} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface MultiSelectFormFieldProps<T extends FieldValues>
  extends BaseFieldProps<T> {
  options: readonly { value: string; label: string }[];
  placeholder?: string;
}

export function MultiSelectFormField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  className,
  description,
}: MultiSelectFormFieldProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const values = (field.value as string[]) || [];
        const selectedLabels = values
          .map((v) => options.find((o) => o.value === v)?.label)
          .filter(Boolean);

        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <div className="relative" ref={containerRef}>
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 min-h-9 dark:bg-input/30 dark:hover:bg-input/50"
              >
                <span className="flex flex-wrap gap-1 flex-1 text-left whitespace-normal">
                  {selectedLabels.length > 0 ? (
                    selectedLabels.map((lbl, i) => (
                      <Badge
                        key={values[i]}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {lbl}
                        <span
                          role="button"
                          tabIndex={0}
                          className="ml-1 hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            field.onChange(
                              values.filter((v) => v !== values[i])
                            );
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.stopPropagation();
                              field.onChange(
                                values.filter((v) => v !== values[i])
                              );
                            }
                          }}
                        >
                          <X className="w-3 h-3" />
                        </span>
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">
                      {placeholder || `Select ${label.toLowerCase()}`}
                    </span>
                  )}
                </span>
                <ChevronDown className="w-4 h-4 shrink-0 opacity-50 ml-2" />
              </button>
              {open && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                  />
                  <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md max-h-60 overflow-auto">
                    {options.map((option) => {
                      const checked = values.includes(option.value);
                      return (
                        <label
                          key={option.value}
                          className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-accent"
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(isChecked) => {
                              if (isChecked) {
                                field.onChange([...values, option.value]);
                              } else {
                                field.onChange(
                                  values.filter(
                                    (v: string) => v !== option.value
                                  )
                                );
                              }
                            }}
                          />
                          {option.label}
                        </label>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

type CheckboxFormFieldProps<T extends FieldValues> = BaseFieldProps<T>;

export function CheckboxFormField<T extends FieldValues>({
  control,
  name,
  label,
  className,
  description,
}: CheckboxFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex items-center gap-2 space-y-0", className)}>
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel className="font-normal">{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}


interface FileUploadFormFieldProps<T extends FieldValues>
  extends BaseFieldProps<T> {
  accept?: string;
  category?: string;
}

export function FileUploadFormField<T extends FieldValues>({
  control,
  name,
  label,
  accept = "image/*,.pdf",
  category = "document",
  className,
  description,
}: FileUploadFormFieldProps<T>) {
  const [fileName, setFileName] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File, onChange: (value: string) => void) => {
      setFileName(file.name);
      setUploadError(null);
      setUploading(true);

      try {
        const { uploadFile } = await import("@/services/storage.service");
        const objectKey = await uploadFile(file, category);
        onChange(objectKey);
      } catch (err) {
        console.error("File upload error:", err);
        setUploadError("Upload failed. Using local file.");
        const reader = new FileReader();
        reader.onloadend = () => {
          onChange(reader.result as string);
          setUploadError(null);
        };
        reader.readAsDataURL(file);
      } finally {
        setUploading(false);
      }
    },
    [category]
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div>
              <Input
                type="file"
                accept={accept}
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file, field.onChange);
                }}
              />
              {uploading && (
                <p className="text-xs text-muted-foreground mt-1">
                  Uploading...
                </p>
              )}
              {fileName && !uploading && (
                <p className="text-xs text-muted-foreground mt-1">
                  {fileName}
                </p>
              )}
              {field.value && !fileName && !uploading && (
                <p className="text-xs text-muted-foreground mt-1">
                  File uploaded
                </p>
              )}
              {uploadError && (
                <p className="text-xs text-destructive mt-1">{uploadError}</p>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
