import ReactFlow, { 
  Background, 
  useNodesState,
  useEdgesState,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { 
    id: '1', 
    position: { x: 50, y: 150 }, 
    data: { label: 'Attacker (External)' },
    style: { background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', padding: '10px' }
  },
  { 
    id: '2', 
    position: { x: 250, y: 150 }, 
    data: { label: 'Web Server (DMZ)' },
    style: { background: '#13131a', color: '#f3f4f6', border: '1px solid #333', borderRadius: '8px', padding: '10px' }
  },
  { 
    id: '3', 
    position: { x: 450, y: 50 }, 
    data: { label: 'Admin-PC (T1078)' },
    style: { background: '#f59e0b', color: 'black', border: 'none', borderRadius: '8px', padding: '10px' }
  },
  { 
    id: '4', 
    position: { x: 450, y: 250 }, 
    data: { label: 'Internal API' },
    style: { background: '#13131a', color: '#f3f4f6', border: '1px solid #333', borderRadius: '8px', padding: '10px' }
  },
  { 
    id: '5', 
    position: { x: 700, y: 150 }, 
    data: { label: 'DB-Prod-01 (Target)' },
    style: { background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)' }
  },
];

const initialEdges = [
  { 
    id: 'e1-2', source: '1', target: '2', animated: true, 
    style: { stroke: '#ef4444' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' }
  },
  { 
    id: 'e2-3', source: '2', target: '3', animated: true,
    style: { stroke: '#ef4444' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' }
  },
  { 
    id: 'e2-4', source: '2', target: '4', 
    style: { stroke: '#333' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#333' }
  },
  { 
    id: 'e3-5', source: '3', target: '5', animated: true,
    label: 'Lateral Movement',
    labelStyle: { fill: '#f59e0b', fontWeight: 'bold' },
    labelBgStyle: { fill: '#0a0a0f' },
    style: { stroke: '#f59e0b', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' }
  },
  { 
    id: 'e4-5', source: '4', target: '5',
    style: { stroke: '#333' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#333' }
  },
];

export default function AttackGraph() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background color="#333" gap={16} />
      </ReactFlow>
    </div>
  );
}
