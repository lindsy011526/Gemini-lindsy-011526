import React, { useEffect, useRef, useState } from 'react';

// A visual simulation of "Neural Network" agents connection
const NeuralWorkbench: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<{x: number, y: number, label: string}[]>([
    { x: 100, y: 150, label: "Input" },
    { x: 300, y: 100, label: "PDF Extractor" },
    { x: 300, y: 250, label: "Data Normalizer" },
    { x: 500, y: 180, label: "Anomaly Detector" },
    { x: 700, y: 180, label: "Output" },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.02;

      // Draw Connections
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.lineWidth = 2;
      
      const connections = [
        [0, 1], [0, 2], [1, 3], [2, 3], [3, 4]
      ];

      connections.forEach(([startIdx, endIdx]) => {
        const start = nodes[startIdx];
        const end = nodes[endIdx];

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        
        // Bezier curve for cool effect
        const cp1x = start.x + (end.x - start.x) / 2;
        const cp1y = start.y;
        const cp2x = start.x + (end.x - start.x) / 2;
        const cp2y = end.y;
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, end.x, end.y);
        ctx.stroke();

        // Moving packet
        const packetPos = (t % 2) / 2; // 0 to 1 loop
        // Simple lerp on curve approximation for visual
        const mx = (1-packetPos)*((1-packetPos)*start.x + packetPos*cp1x) + packetPos*((1-packetPos)*cp2x + packetPos*end.x);
        const my = (1-packetPos)*((1-packetPos)*start.y + packetPos*cp1y) + packetPos*((1-packetPos)*cp2y + packetPos*end.y);

        ctx.fillStyle = '#FF7F50'; // Coral
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Nodes
      nodes.forEach(node => {
        ctx.fillStyle = 'rgba(10, 10, 20, 0.8)';
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = '12px Inter';
        ctx.fillText(node.label, node.x - 20, node.y + 35);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, [nodes]);

  return (
    <div className="w-full h-96 glass-panel rounded-xl relative overflow-hidden flex flex-col items-center justify-center">
        <h3 className="absolute top-4 left-4 text-agent-blue font-bold tracking-widest uppercase text-sm">Neural Network Navigator</h3>
        <canvas ref={canvasRef} width={800} height={400} className="max-w-full" />
    </div>
  );
};

export default NeuralWorkbench;