"use client";

import type React from "react";

import { useRef, useCallback, useState, useEffect } from "react";
import { Button } from "@/components/dashboard/ui/button";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dashboard/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/dashboard/ui/tooltip";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link,
  Sparkles,
  Type,
  Undo,
  Redo,
} from "lucide-react";
import { cn } from "@/utils/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  showCharacterCount?: boolean;
  showWritingHelp?: boolean;
  minHeight?: string;
}

interface FormatState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  orderedList: boolean;
  unorderedList: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter text...",
  className = "",
  maxLength,
  showCharacterCount = false,
  showWritingHelp = false,
  minHeight = "100px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [formatState, setFormatState] = useState<FormatState>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    orderedList: false,
    unorderedList: false,
  });
  const [history, setHistory] = useState<string[]>([value]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Convert HTML to plain text for character counting
  const getTextContent = useCallback((html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }, []);

  // Save current selection
  const saveSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      return selection.getRangeAt(0);
    }
    return null;
  }, []);

  // Restore selection
  const restoreSelection = useCallback((range: Range | null) => {
    if (range) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, []);

  // Update format state based on current selection
  const updateFormatState = useCallback(() => {
    if (!editorRef.current || !isFocused) return;

    try {
      setFormatState({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strikethrough: document.queryCommandState("strikeThrough"),
        orderedList: document.queryCommandState("insertOrderedList"),
        unorderedList: document.queryCommandState("insertUnorderedList"),
      });
    } catch (error) {
      // Ignore errors from queryCommandState
    }
  }, [isFocused]);

  // Save to history for undo/redo
  const saveToHistory = useCallback(
    (content: string) => {
      if (isUpdating) return;

      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        if (newHistory[newHistory.length - 1] !== content) {
          newHistory.push(content);
          return newHistory.slice(-50); // Keep last 50 states
        }
        return prev;
      });
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex, isUpdating]
  );

  // Execute formatting command
  const executeCommand = useCallback(
    (command: string, value?: string) => {
      if (!editorRef.current) return;

      const savedRange = saveSelection();

      try {
        editorRef.current.focus();
        const success = document.execCommand(command, false, value);

        if (!success && command === "insertHTML" && value) {
          // Fallback for insertHTML if execCommand fails
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = value;

            // Insert the HTML content
            const fragment = document.createDocumentFragment();
            while (tempDiv.firstChild) {
              fragment.appendChild(tempDiv.firstChild);
            }

            range.deleteContents();
            range.insertNode(fragment);

            // Restore selection
            restoreSelection(savedRange);
          }
        }

        const content = editorRef.current.innerHTML;
        onChange(content);
        saveToHistory(content);

        // Restore selection after a brief delay
        setTimeout(() => {
          updateFormatState();
        }, 10);
      } catch (error) {
        console.warn("Command execution failed:", error);
      }
    },
    [onChange, saveToHistory, updateFormatState, saveSelection, restoreSelection]
  );

  // Handle formatting buttons
  const handleFormat = useCallback(
    (command: string) => {
      executeCommand(command);
    },
    [executeCommand]
  );

  // Handle undo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0 && editorRef.current) {
      setIsUpdating(true);
      const newIndex = historyIndex - 1;
      const content = history[newIndex];
      setHistoryIndex(newIndex);
      editorRef.current.innerHTML = content;
      onChange(content);
      setTimeout(() => setIsUpdating(false), 10);
    }
  }, [history, historyIndex, onChange]);

  // Handle redo
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1 && editorRef.current) {
      setIsUpdating(true);
      const newIndex = historyIndex + 1;
      const content = history[newIndex];
      setHistoryIndex(newIndex);
      editorRef.current.innerHTML = content;
      onChange(content);
      setTimeout(() => setIsUpdating(false), 10);
    }
  }, [history, historyIndex, onChange]);

  // Handle link insertion
  const handleLink = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setLinkText(selection.toString());
    } else {
      setLinkText("");
    }
    setLinkUrl("");
    setShowLinkDialog(true);
  }, []);

  // Insert link
  const insertLink = useCallback(() => {
    if (linkUrl && editorRef.current) {
      const displayText = linkText || linkUrl;
      const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">${displayText}</a>`;

      // Try to use execCommand first, fallback to manual insertion
      try {
        editorRef.current.focus();
        const success = document.execCommand("insertHTML", false, linkHtml);

        if (!success) {
          // Fallback: manually insert the link at cursor position
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const linkElement = document.createElement('a');
            linkElement.href = linkUrl;
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            linkElement.style.color = '#2563eb';
            linkElement.style.textDecoration = 'underline';
            linkElement.textContent = displayText;

            range.deleteContents();
            range.insertNode(linkElement);

            // Move cursor after the link
            range.setStartAfter(linkElement);
            range.setEndAfter(linkElement);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }

        // Update content and save to history
        const content = editorRef.current.innerHTML;
        onChange(content);
        saveToHistory(content);
      } catch (error) {
        console.warn("Link insertion failed:", error);
      }
    }
    setShowLinkDialog(false);
    setLinkText("");
    setLinkUrl("");
  }, [linkText, linkUrl, onChange, saveToHistory]);

  // Handle input changes
  const handleInput = useCallback(() => {
    if (!editorRef.current || isUpdating) return;

    const content = editorRef.current.innerHTML;

    if (maxLength) {
      const textContent = getTextContent(content);
      if (textContent.length > maxLength) {
        // Revert to previous content if max length exceeded
        editorRef.current.innerHTML = value;
        return;
      }
    }

    onChange(content);
    updateFormatState();
  }, [
    onChange,
    maxLength,
    getTextContent,
    value,
    updateFormatState,
    isUpdating,
  ]);

  // Handle paste with formatting cleanup
  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();

      const plainText = e.clipboardData.getData("text/plain");
      const htmlText = e.clipboardData.getData("text/html");

      if (
        htmlText &&
        (htmlText.includes("<b>") ||
          htmlText.includes("<strong>") ||
          htmlText.includes("<i>") ||
          htmlText.includes("<em>"))
      ) {
        // Clean up the HTML to only allow safe tags
        const cleanHtml = htmlText
          .replace(/<script[^>]*>.*?<\/script>/gi, "")
          .replace(/<style[^>]*>.*?<\/style>/gi, "")
          .replace(/on\w+="[^"]*"/gi, "")
          .replace(/<(?!\/?(b|strong|i|em|u|strike|ul|ol|li|a)\b)[^>]*>/gi, "");

        executeCommand("insertHTML", cleanHtml);
      } else {
        executeCommand("insertText", plainText);
      }
    },
    [executeCommand]
  );

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b":
            e.preventDefault();
            handleFormat("bold");
            break;
          case "i":
            e.preventDefault();
            handleFormat("italic");
            break;
          case "u":
            e.preventDefault();
            handleFormat("underline");
            break;
          case "k":
            e.preventDefault();
            handleLink();
            break;
          case "z":
            if (e.shiftKey) {
              e.preventDefault();
              handleRedo();
            } else {
              e.preventDefault();
              handleUndo();
            }
            break;
          case "y":
            e.preventDefault();
            handleRedo();
            break;
        }
      }
    },
    [handleFormat, handleUndo, handleRedo, handleLink]
  );

  // Update editor content when value prop changes (only if different)
  useEffect(() => {
    if (editorRef.current && !isUpdating) {
      const currentContent = editorRef.current.innerHTML;
      if (currentContent !== value) {
        const savedRange = saveSelection();
        editorRef.current.innerHTML = value;
        restoreSelection(savedRange);
      }
    }
  }, [value, isUpdating, saveSelection, restoreSelection]);

  // Initialize history with initial value
  useEffect(() => {
    if (history.length === 1 && history[0] !== value) {
      setHistory([value]);
      setHistoryIndex(0);
    }
  }, [value, history]);

  // Update format state on selection change
  useEffect(() => {
    const handleSelectionChange = () => {
      if (isFocused && !isUpdating) {
        updateFormatState();
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, [isFocused, updateFormatState, isUpdating]);

  const currentLength = getTextContent(value);
  const isOverLimit = maxLength ? currentLength.length > maxLength : false;

  return (
    <TooltipProvider>
      <div className="space-y-2">
        {/* Rich Text Toolbar */}
        <div className="flex items-center gap-1 p-2 border border-gray-200 rounded-t-md bg-gray-50">
          {/* Undo/Redo */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                title="Undo (Ctrl+Z)"
              >
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                title="Redo (Ctrl+Y)"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
          </Tooltip>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Text Formatting */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn("h-8 w-8 p-0", formatState.bold && "bg-gray-200")}
                onClick={() => handleFormat("bold")}
                title="Bold (Ctrl+B)"
              >
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold (Ctrl+B)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-8 p-0",
                  formatState.italic && "bg-gray-200"
                )}
                onClick={() => handleFormat("italic")}
                title="Italic (Ctrl+I)"
              >
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic (Ctrl+I)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-8 p-0",
                  formatState.underline && "bg-gray-200"
                )}
                onClick={() => handleFormat("underline")}
                title="Underline (Ctrl+U)"
              >
                <Underline className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Underline (Ctrl+U)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-8 p-0",
                  formatState.strikethrough && "bg-gray-200"
                )}
                onClick={() => handleFormat("strikeThrough")}
                title="Strikethrough"
              >
                <Strikethrough className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Strikethrough</TooltipContent>
          </Tooltip>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Lists */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-8 p-0",
                  formatState.unorderedList && "bg-gray-200"
                )}
                onClick={() => handleFormat("insertUnorderedList")}
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-8 p-0",
                  formatState.orderedList && "bg-gray-200"
                )}
                onClick={() => handleFormat("insertOrderedList")}
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Numbered List</TooltipContent>
          </Tooltip>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Link */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleLink}
                title="Insert Link (Ctrl+K)"
              >
                <Link className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert Link (Ctrl+K)</TooltipContent>
          </Tooltip>

          {/* Clear Formatting */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleFormat("removeFormat")}
                title="Clear Formatting"
              >
                <Type className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear Formatting</TooltipContent>
          </Tooltip>

          {showWritingHelp && (
            <>
              <div className="flex-1" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 text-xs"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Get help with writing
                  </Button>
                </TooltipTrigger>
                <TooltipContent>AI Writing Assistant</TooltipContent>
              </Tooltip>
            </>
          )}
        </div>

        {/* Rich Text Editor */}
        <div
          ref={editorRef}
          contentEditable
          className={cn(
            "p-3 border border-gray-200 rounded-b-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent overflow-y-auto",
            isOverLimit && "border-red-300 focus:ring-red-500",
            className
          )}
          style={{
            borderTop: "none",
            minHeight,
            maxHeight: "300px",
            direction: "ltr",
            textAlign: "left",
            unicodeBidi: "normal",
          }}
          onInput={handleInput}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          data-placeholder={placeholder}
          suppressContentEditableWarning={true}
        />

        {/* Character Count */}
        {showCharacterCount && maxLength && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">
              Recruiter tip: write {maxLength}+ characters to increase interview
              chances
            </span>
            <span
              className={cn(
                "text-gray-500",
                isOverLimit && "text-red-500 font-medium"
              )}
            >
              {currentLength} / {maxLength}+
            </span>
          </div>
        )}

        {/* Link Dialog */}
        <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
          <DialogContent className="sm:max-w-[425px] bg-[#fff]">
            <DialogHeader>
              <DialogTitle>Insert Link</DialogTitle>
              <DialogDescription>
                Add a link to your text. You can link to websites, portfolios,
                or any URL.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="link-text">Link Text (optional)</Label>
                <Input
                  id="link-text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Text to display (leave empty to use URL)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link-url">URL *</Label>
                <Input
                  id="link-url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  type="url"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowLinkDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={insertLink} disabled={!linkUrl.trim()}>
                Insert Link
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <style jsx>{`
          [contenteditable]:empty:before {
            content: attr(data-placeholder);
            color: #9ca3af;
            pointer-events: none;
            font-style: italic;
          }
          [contenteditable] {
            direction: ltr !important;
            text-align: left !important;
            unicode-bidi: normal !important;
          }
          [contenteditable] * {
            direction: ltr !important;
            unicode-bidi: normal !important;
          }
          [contenteditable] a {
            color: #2563eb !important;
            text-decoration: underline !important;
          }
          [contenteditable] a:hover {
            color: #1d4ed8 !important;
          }
          [contenteditable] ul {
            list-style-type: disc;
            margin: 8px 0 8px 20px;
            padding-left: 0;
          }
          [contenteditable] ol {
            list-style-type: decimal;
            margin: 8px 0 8px 20px;
            padding-left: 0;
          }
          [contenteditable] li {
            margin: 4px 0;
            padding-left: 4px;
            direction: ltr !important;
          }
          [contenteditable] strong,
          [contenteditable] b {
            font-weight: 600;
          }
          [contenteditable] em,
          [contenteditable] i {
            font-style: italic;
          }
          [contenteditable] u {
            text-decoration: underline;
          }
          [contenteditable] strike {
            text-decoration: line-through;
          }
          [contenteditable]:focus {
            outline: none;
          }
          [contenteditable] p {
            margin: 0;
            direction: ltr !important;
          }
          [contenteditable] div {
            direction: ltr !important;
          }
        `}</style>
      </div>
    </TooltipProvider>
  );
}