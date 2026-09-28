'use client';

import React, { useRef, useState, useEffect } from 'react';
import { RefreshCw, Check, Edit3 } from '../icons';
import { Button } from './Button';

export interface SignaturePadProps {
  onSave?: (signatureDataUrl: string) => void;
  height?: number;
  label?: string;
}

export function SignaturePad({
  onSave,
  height = 140,
  label = 'Sign Here (Draw with mouse or finger)'
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-DPI scaling
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [height]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasSignature(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !onSave) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSave(dataUrl);
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span className="font-semibold flex items-center gap-1.5">
          <Edit3 className="w-3.5 h-3.5 text-blue-600" />
          {label}
        </span>
        {hasSignature && (
          <span className="text-emerald-600 font-medium flex items-center gap-1 text-[11px]">
            <Check className="w-3 h-3" /> Signature captured
          </span>
        )}
      </div>

      <div className="relative border-2 border-dashed border-slate-300 rounded-xl overflow-hidden bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-crosshair">
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: `${height}px` }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="touch-none block"
        />

        {!hasSignature && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-xs text-slate-400">
            Sign inside this box
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={clearCanvas}
          disabled={!hasSignature}
        >
          Clear
        </Button>
        {onSave && (
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={!hasSignature}
          >
            Confirm Signature
          </Button>
        )}
      </div>
    </div>
  );
}
