from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str
    type: str
    data: Dict[str, Any]


class Edge(BaseModel):
    source: str
    target: str
    id: str


class PipelineInput(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

@app.get('/')
def read_root():
    return {'status': 'Pipeline API is running', 'version': '1.0'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineInput) -> PipelineResponse:
    """
    Parse and validate a pipeline.

    Returns:
    - num_nodes: Number of nodes in the pipeline
    - num_edges: Number of edges/connections in the pipeline
    - is_dag: Whether the pipeline forms a Directed Acyclic Graph (no cycles)
    """

    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    G = nx.DiGraph()

    for node in pipeline.nodes:
        G.add_node(node.id)

    for edge in pipeline.edges:
        G.add_edge(edge.source, edge.target)

    is_dag = nx.is_directed_acyclic_graph(G)

    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag,
    )
