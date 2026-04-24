"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

interface InlineEditProps {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "textarea";
  placeholder?: string;
  className?: string;
  textClassName?: string;
}

export function InlineEdit({
  value,
  onChange,
  type = "text",
  placeholder = "Click to edit...",
  className,
  textClassName,
}: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Move cursor to end
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (currentValue.trim() !== value) {
      onChange(currentValue);
    } else {
      setCurrentValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && type === "text") {
      handleBlur();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setCurrentValue(value);
    }
  };

  if (isEditing) {
    if (type === "textarea") {
      return (
        <Textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn("min-h-[100px] resize-none", className)}
        />
      );
    }
    return (
      <Input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn("h-8 py-1", className)}
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={cn(
        "cursor-pointer rounded-md border border-transparent hover:border-border hover:bg-muted/50 p-1 transition-colors break-words",
        textClassName,
        !value && "text-muted-foreground italic"
      )}
    >
      {value || placeholder}
    </div>
  );
}
