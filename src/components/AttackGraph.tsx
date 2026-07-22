import { useEffect } from 'react';
import ReactFlow, { 
  Background, 
  useNodesState,
  useEdgesState,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

interface AttackGraphProps {
  isDark: boolean;
}

export default function AttackGraph({ isDark }: AttackGraphProps) {
  const getStyles = (isDark: boolean) => ({
    bg: isDark ? '#050508' : '#f8fafc',
    text: isDark ? '#f8fafc' : '#0f172a',
    border: isDark ? '#334155' : '#cbd5e1',
    line: isDark ? '#64748b' : '#94a3b8'
  });

  const styles = getStyles(isDark);

  const initialNodes = [
    { 
      id: '1', 
      position: { x: 50, y: 150 }, 
      data: { label: 'Attacker' },
      style: { background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '12px', fontWeight: 500 }
    },
    { 
      id: '2', 
      position: { x: 250, y: 150 }, 
      data: { label: 'Web Server' },
      style: { background: styles.bg, color: styles.text, border: `1px solid ${styles.border}`, borderRadius: '8px', padding: '10px', fontSize: '12px', fontWeight: 500 }
    },
    { 
      id: '3', 
      position: { x: 450, y: 50 }, 
      data: { label: 'Admin-PC' },
      style: { background: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '12px', fontWeight: 500 }
    },
    { 
      id: '4', 
      position: { x: 450, y: 250 }, 
      data: { label: 'Internal API' },
      style: { background: styles.bg, color: styles.text, border: `1px solid ${styles.border}`, borderRadius: '8px', padding: '10px', fontSize: '12px', fontWeight: 500 }
    },
    { 
      id: '5', 
      position: { x: 700, y: 150 }, 
      data: { label: 'DB-Prod' },
      style: { background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '12px', fontWeight: 500 }
    },
  ];

  const initialEdges = [
    { 
      id: 'e1-2', source: '1', target: '2', animated: true, 
      style: { stroke: '#ef4444', strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' }
    },
    { 
      id: 'e2-3', source: '2', target: '3', animated: true,
      style: { stroke: '#ef4444', strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' }
    },
    { 
      id: 'e2-4', source: '2', target: '4', 
      style: { stroke: styles.line, strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: styles.line }
    },
    { 
      id: 'e3-5', source: '3', target: '5', animated: true,
      label: 'Lateral Move',
      labelStyle: { fill: '#f59e0b', fontWeight: 600, fontSize: 10 },
      labelBgStyle: { fill: isDark ? '#1e293b' : '#f1f5f9', rx: 4, ry: 4 },
      style: { stroke: '#f59e0b', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' }
    },
    { 
      id: 'e4-5', source: '4', target: '5',
      style: { stroke: styles.line, strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: styles.line }
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update node and edge styles when theme changes
  useEffect(() => {
    const newStyles = getStyles(isDark);
    setNodes(nds => nds.map(node => {
      if (node.id === '2' || node.id === '4') {
        return {
          ...node,
          style: { ...node.style, background: newStyles.bg, color: newStyles.text, border: `1px solid ${newStyles.border}` }
        };
      }
      return node;
    }));
    setEdges(eds => eds.map(edge => {
      if (edge.id === 'e2-4' || edge.id === 'e4-5') {
        return {
          ...edge,
          style: { stroke: newStyles.line, strokeWidth: 1.5 },
          markerEnd: { type: MarkerType.ArrowClosed, color: newStyles.line }
        };
      }
      if (edge.id === 'e3-5') {
        return {
          ...edge,
          labelBgStyle: { fill: isDark ? '#1e293b' : '#f1f5f9', rx: 4, ry: 4 }
        };
      }
      return edge;
    }));
  }, [isDark, setNodes, setEdges]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background color={isDark ? '#334155' : '#cbd5e1'} gap={16} />
      </ReactFlow>
    </div>
  );
}
