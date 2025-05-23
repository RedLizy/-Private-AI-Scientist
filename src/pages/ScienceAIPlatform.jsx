import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, ChevronRight, Database, Search, Zap, Brain, Layers, CheckCircle, Book, 
  AlignJustify, FileText, Award, Server, BarChart3, Code, Folder, FolderOpen, File,
  BookOpen, Microscope, Globe, PieChart, Lock, Terminal, Monitor, Plus, User,
  MessageCircle, Sparkles, Activity, Settings, Maximize, Minimize, ArrowRight, Save,
  Calendar, DollarSign, Target, Edit, Layout, Send, X, Check, HelpCircle, RefreshCw,
  Play, MoreHorizontal, Dna, Beaker, FlaskConical, PlayCircle
} from 'lucide-react';
import { dateUtils } from '../utils/dateUtils';
import FileExplorer from '../components/layout/FileExplorer';
import WorkflowVisualizer from '../components/scientist/WorkflowVisualizer';
import ChatInterface from '../components/scientist/ChatInterface';
import DocumentEditor from '../components/scientist/DocumentEditor';
import PlasmidViewer from '../components/scientist/PlasmidViewer';
import SetupWizard from '../components/scientist/SetupWizard';
import '../styles/ScienceAIPlatform.css';

const ScienceAIPlatform = () => {
  // Check for existing project in localStorage
  const savedProject = localStorage.getItem('aiScientistProject');
  const initialProjectData = savedProject ? JSON.parse(savedProject) : {
    name: '',
    objectives: [''],
    timeline: ''
  };
  const hasExistingProject = savedProject !== null;
  
  // Page state - redirect to workspace if project exists
  const [currentPage, setCurrentPage] = useState(hasExistingProject ? 'workspace' : 'home');
  const [projectReady, setProjectReady] = useState(hasExistingProject);
  
  // Project data
  const [projectData, setProjectData] = useState(initialProjectData);
  
  // Workspace state
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [userQuery, setUserQuery] = useState('');
  const [documentContent, setDocumentContent] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [editableContent, setEditableContent] = useState(
    localStorage.getItem('aiScientistResearchPlan') || ''
  );
  const [selectedText, setSelectedText] = useState('');
  const [selectionPos, setSelectionPos] = useState({ x: 0, y: 0 });
  const [showTextSelector, setShowTextSelector] = useState(false);
  const [textQuestion, setTextQuestion] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [generatingPlan, setGeneratingPlan] = useState(false);
  
  // Status variables
  const [showNewFileMenu, setShowNewFileMenu] = useState(false);
  const [showPlasmidViewer, setShowPlasmidViewer] = useState(false);
  const [runningBenchling, setRunningBenchling] = useState(false);
  
  // Refs
  const contentEditableRef = useRef(null);
  const newFileMenuRef = useRef(null);
  
  // Auto-save editable content to localStorage
  useEffect(() => {
    if (editableContent && projectReady) {
      localStorage.setItem('aiScientistResearchPlan', editableContent);
    }
  }, [editableContent, projectReady]);
  
  // Workflow steps
  const steps = [
    { id: 0, title: "Scientist Query", icon: <Microscope size={16} /> },
    { id: 1, title: "Query Preprocessing", icon: <AlignJustify size={16} /> },
    { id: 2, title: "Knowledge Retrieval", icon: <Search size={16} /> },
    { id: 3, title: "Index Matching", icon: <Database size={16} /> },
    { id: 4, title: "Knowledge Recall", icon: <BookOpen size={16} /> },
    { id: 5, title: "Information Integration", icon: <Layers size={16} /> },
    { id: 6, title: "Inference Generation", icon: <Brain size={16} /> },
    { id: 7, title: "Answer Optimization", icon: <Zap size={16} /> },
    { id: 8, title: "Final Answer", icon: <Award size={16} /> }
  ];

  // Step logs
  const stepLogs = {
    0: [
      "[LOG] 11:42:03 - Receiving scientist query",
      "[LOG] 11:42:03 - Starting query parsing engine",
      "[LOG] 11:42:04 - Entity recognition complete: 3 key entities",
      "[LOG] 11:42:04 - Classified as bioengineering specialized query"
    ],
    1: [
      "[LOG] 11:42:05 - Starting query preprocessing",
      "[LOG] 11:42:06 - Generating query vector representation",
      "[LOG] 11:42:06 - Applying domain adaptation layer",
      "[LOG] 11:42:07 - Identifying implicit needs: experimental design required"
    ],
    2: [
      "[LOG] 11:42:08 - Starting distributed retrieval engine",
      "[LOG] 11:42:09 - Simultaneously searching 4 external academic databases",
      "[LOG] 11:42:10 - Searching internal experiment records",
      "[LOG] 11:42:11 - Retrieving Benchling project data: PRJ-528974"
    ],
    3: [
      "[LOG] 11:42:12 - Computing query vector similarity with knowledge base indices",
      "[LOG] 11:42:13 - Using HNSW algorithm to accelerate similarity search",
      "[LOG] 11:42:14 - Adjusting relevance scores with time decay factor",
      "[LOG] 11:42:15 - Initial matching complete: 73 high-relevance indices identified"
    ],
    4: [
      "[LOG] 11:42:16 - Starting deep parsing of matched documents",
      "[LOG] 11:42:17 - Extracting key experimental steps from methods sections",
      "[LOG] 11:42:18 - Parsing tabular data: experimental parameter data",
      "[LOG] 11:42:19 - Extracting experimental design information from figures"
    ],
    5: [
      "[LOG] 11:42:20 - Starting information integration engine",
      "[LOG] 11:42:21 - Identifying associations between information sources",
      "[LOG] 11:42:22 - Using confidence-weighted resolution for data conflicts",
      "[LOG] 11:42:23 - Building knowledge graph: experimental design relationship network"
    ],
    6: [
      "[LOG] 11:42:24 - Starting inference engine",
      "[LOG] 11:42:25 - Constructing experimental design model",
      "[LOG] 11:42:26 - Optimizing experimental parameters: calculating optimal conditions",
      "[LOG] 11:42:27 - Deriving optimal experimental step sequence"
    ],
    7: [
      "[LOG] 11:42:28 - Starting answer optimization module",
      "[LOG] 11:42:29 - Restructuring answer organization",
      "[LOG] 11:42:30 - Validating key data reference sources",
      "[LOG] 11:42:31 - Terminology consistency check"
    ],
    8: [
      "[LOG] 11:42:32 - Generating final answer",
      "[LOG] 11:42:33 - Creating experimental design diagrams",
      "[LOG] 11:42:34 - Formatting references",
      "[LOG] 11:42:35 - Quality check: answer passed validation"
    ]
  };

  // Example research plan (generated based on project objectives)
  const generateResearchPlan = () => {
    return `# ${projectData.name} Research Plan

## Project Overview
This project aims to ${projectData.objectives.join(", and ")}. The plan is to complete all research work within ${projectData.timeline}.

## Research Hypotheses
1. **Primary Hypothesis**: By optimizing the expression system, we can significantly increase the yield and purity of the target protein
2. **Secondary Hypothesis**: Precise control of expression conditions has a decisive impact on protein folding and activity
3. **Test Metrics**: Expression level increase ≥30%, protein purity ≥95%, activity retention ≥85%

## Experimental Design

### Phase 1: Expression System Optimization (${projectData.timeline.split('to')[0]} - ${dateUtils.getDateAfterMonths(projectData.timeline, 2)})
1. **Experiment 1.1**: Promoter screening and optimization
   - Test 5 different strength promoters
   - Establish fluorescent protein reporter system to evaluate promoter efficiency
   - Use flow cytometry for quantitative analysis of expression levels

2. **Experiment 1.2**: Signal peptide optimization
   - Design and synthesize 3 different signal peptide sequences
   - Construct test vectors and transform expression host
   - Analyze secretion efficiency via Western blot

### Phase 2: Culture Condition Optimization (${dateUtils.getDateAfterMonths(projectData.timeline, 2)} - ${dateUtils.getDateAfterMonths(projectData.timeline, 4)})
1. **Experiment 2.1**: Culture medium component screening
   - Orthogonal design of different carbon and nitrogen source combinations
   - Monitor growth curves and protein expression levels
   - Determine optimal culture medium formulation

2. **Experiment 2.2**: Culture parameter optimization
   - Use controlled variable method to test temperature, pH and dissolved oxygen conditions
   - Establish response surface model to predict optimal combinations
   - Verify model accuracy

### Phase 3: Purification Process Development (${dateUtils.getDateAfterMonths(projectData.timeline, 4)} - ${projectData.timeline.split('to')[1]})
1. **Experiment 3.1**: Chromatography condition screening
   - Test different types of chromatography media
   - Optimize elution conditions and gradient settings
   - Improve protein purity and recovery rate

2. **Experiment 3.2**: Final product quality analysis
   - Perform mass spectrometric analysis to confirm protein integrity
   - Test protein biological activity
   - Evaluate stability and shelf life

## Expected Results
1. Determine the optimal expression system combination, increasing yield by 30-50%
2. Establish a stable, reproducible production process
3. Obtain high-quality, high-activity target protein

## Timeline and Milestones
- **${dateUtils.getDateAfterMonths(projectData.timeline, 2)}**: Complete expression system optimization, determine optimal promoter and signal peptide combination
- **${dateUtils.getDateAfterMonths(projectData.timeline, 4)}**: Complete culture condition optimization, establish standard production process
- **${projectData.timeline.split('to')[1]}**: Complete purification process development, submit final research report

## Required Resources
- Molecular biology experimental equipment and reagents
- Bioreactors and fermentation equipment
- Protein analysis equipment (HPLC, mass spectrometer, etc.)
- Bioinformatics analysis software

## Risk Assessment and Mitigation Strategies
1. **Risk**: Expression level below expectation
   **Mitigation**: Prepare alternative promoters and expression systems

2. **Risk**: Protein aggregation or misfolding
   **Mitigation**: Explore molecular chaperone co-expression strategies

3. **Risk**: Large yield loss in purification process
   **Mitigation**: Develop one-step purification method under mild conditions`;
  };

  // Experiment plan content
  const experimentPlanContent = `# Genetic Engineering Experiment Plan

## Experimental Objectives
Construct and validate a recombinant plasmid that efficiently expresses the target protein and achieve stable expression in Pichia pastoris.

## Materials and Methods

### 1. Plasmid Design
Based on the latest research results, we have designed an optimized expression vector including the following elements:
- **Promoter**: pAOX1 (methanol-inducible, high expression efficiency)
- **Signal Peptide**: Optimized α-MF signal peptide (EA sequence deleted)
- **Target Gene**: Codon-optimized human-derived gene
- **Terminator**: AOX1 terminator
- **Selection Marker**: Zeocin resistance gene

### 2. Cloning Strategy
1. PCR amplification of target gene, primer design includes appropriate restriction enzyme sites
2. Restriction enzyme digestion of vector and target gene
3. Ligation reaction to construct recombinant plasmid
4. Transform E. coli DH5α
5. Screen positive clones and verify sequence

### 3. Host Transformation
1. Linearize recombinant plasmid
2. Prepare P. pastoris GS115 competent cells
3. Electroporation
4. Screen transformants on YPD plates containing Zeocin

### 4. Expression Validation
1. Small-scale expression test
2. SDS-PAGE and Western blot analysis
3. Protein activity determination

## Expected Results
The constructed recombinant plasmid is expected to achieve efficient and stable target protein expression in P. pastoris, with protein yield ≥3.5g/L and purity ≥90%.

## Schedule
- Weeks 1-2: Plasmid design and construction
- Weeks 3-4: Host transformation and screening
- Weeks 5-8: Expression condition optimization and validation`;

  // DNA sequence data (simulated)
  const plasmidSequence = {
    name: "pPIC-hProtein-Opt",
    length: 8245,
    features: [
      { name: "pAOX1 Promoter", start: 1, end: 948, color: "#3B82F6", type: "promoter" },
      { name: "α-MF Signal", start: 949, end: 1218, color: "#10B981", type: "signal_peptide" },
      { name: "Target Gene", start: 1219, end: 4017, color: "#F43F5E", type: "CDS" },
      { name: "AOX1 Terminator", start: 4018, end: 4352, color: "#A855F7", type: "terminator" },
      { name: "Zeocin Resistance", start: 4353, end: 5153, color: "#F59E0B", type: "marker" },
      { name: "pUC Origin", start: 5154, end: 7803, color: "#64748B", type: "rep_origin" },
      { name: "Ampicillin Resistance", start: 7804, end: 8245, color: "#EC4899", type: "marker" }
    ],
    sequence: "ATGGCTATGCAGAAACTGAAAGCGCTGGCGACCCTGGAAGTGCGTCTGACCACCCTGAGC..." // Abbreviated actual sequence
  };

  // Handle adding new file
  const handleAddNewFile = (fileType) => {
    let fileId = null;
    let newContent = '';
    
    switch(fileType) {
      case 'project':
        fileId = addFileToTree('folder', 'New Research Project');
        setChatHistory(prev => [...prev, {
          type: 'user',
          content: 'Create a new research project'
        }, {
          type: 'ai',
          content: 'I have created a new research project. Please check the file tree on the left.'
        }]);
        break;
      case 'objective':
        fileId = addFileToTree('folder', 'New Research Objective');
        setChatHistory(prev => [...prev, {
          type: 'user',
          content: 'Add a new research objective'
        }, {
          type: 'ai',
          content: 'New research objective added. You can view and edit it in the file tree on the left.'
        }]);
        break;
      case 'plan':
        fileId = addFileToTree('file', 'Research Plan');
        // Update document content to research plan
        setEditableContent(generateResearchPlan());
        setChatHistory(prev => [...prev, {
          type: 'user',
          content: 'Generate a research plan'
        }, {
          type: 'ai',
          content: 'I have generated a detailed research plan based on your project objectives.'
        }]);
        break;
      case 'hypothesis':
        fileId = addFileToTree('file', 'Research Hypothesis');
        newContent = `# Research Hypothesis\n\n## Primary Hypothesis\nIn ${projectData.name || "current research"}, we hypothesize that by optimizing expression system components and culture conditions, we can significantly increase the yield and quality of the target protein.\n\n## Secondary Hypotheses\n1. Promoter selection has a decisive effect on expression level\n2. Signal peptide optimization can improve secretion efficiency\n3. Precise control of culture conditions can reduce protein degradation\n\n## Hypothesis Testing Methods\nWe will validate these hypotheses through systematic experimental design and control experiments, including:\n- Comparing expression levels of different promoter systems\n- Measuring secretion efficiency of improved signal peptides\n- Monitoring protein yield and quality under different culture conditions`;
        setEditableContent(newContent);
        setChatHistory(prev => [...prev, {
          type: 'user',
          content: 'Create research hypothesis'
        }, {
          type: 'ai',
          content: 'I have created a research hypothesis document that you can further modify as needed.'
        }]);
        break;
      case 'experiment':
        fileId = addFileToTree('file', 'Experiment Plan');
        // Update to experiment plan
        setEditableContent(experimentPlanContent);
        setChatHistory(prev => [...prev, {
          type: 'user',
          content: 'Generate an experiment plan'
        }, {
          type: 'ai',
          content: 'I have generated a genetic engineering experiment plan. You can view it and run gene construction simulation.'
        }]);
        break;
    }
    
    return fileId;
  };

  // Handle running genetic simulation
  const handleRunGeneticSimulation = () => {
    setRunningBenchling(true);
    
    // Simulate running Benchling API
    setTimeout(() => {
      setRunningBenchling(false);
      setShowPlasmidViewer(true);
      
      // Add to chat history
      setChatHistory(prev => [...prev, {
        type: 'ai',
        content: 'Gene design and simulation completed. Successfully constructed target plasmid: pPIC-hProtein-Opt (8245 bp).'
      }]);
    }, 3000);
  };

  // Simulate knowledge base processing workflow
  const simulateWorkflow = (fullCycle = true) => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < steps.length) {
        setActiveStep(step);
        step++;
      } else {
        clearInterval(interval);
        if (fullCycle) {
          // Add answer after simulation is complete
          setEditableContent(experimentPlanContent);
          setChatHistory(prev => [...prev, {
            type: 'ai',
            content: 'I have completed the answer based on the knowledge base. The result has been added to the document.'
          }]);
        }
      }
    }, 1000);
  };

  // Handle project form change
  const handleProjectChange = (field, value, index) => {
    if (field === 'objectives' && index !== undefined) {
      setProjectData(prev => {
        const newObjectives = [...prev.objectives];
        newObjectives[index] = value;
        return { ...prev, objectives: newObjectives };
      });
    } else {
      setProjectData(prev => ({ ...prev, [field]: value }));
    }
  };

  // Add new objective
  const addObjective = () => {
    setProjectData(prev => ({
      ...prev,
      objectives: [...prev.objectives, '']
    }));
  };

  // Handle setup steps
  const handleSetupComplete = (projectData) => {
    setProjectData(projectData);
    setProjectReady(true);
    
    // Save project data to localStorage
    localStorage.setItem('aiScientistProject', JSON.stringify(projectData));
    
    // Show generating status
    setCurrentPage('generating');
    setGeneratingPlan(true);
    
    // Simulate AI generating research plan
    setTimeout(() => {
      const researchPlan = generateResearchPlan();
      setEditableContent(researchPlan);
      // Save research plan to localStorage
      localStorage.setItem('aiScientistResearchPlan', researchPlan);
      setGeneratingPlan(false);
      setCurrentPage('workspace');
    }, 5000);
  };

  // Handle user query
  const handleAskQuestion = (query) => {
    if (!query.trim()) return;
    
    // Add user question to chat history
    setChatHistory(prev => [...prev, {
      type: 'user',
      content: query
    }]);
    
    // Start simulating workflow
    setShowWorkflow(true);
    setActiveStep(0);
    simulateWorkflow();
    
    // Clear input box
    setUserQuery('');
  };

  // Handle text selection
  const handleTextSelect = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    
    if (contentEditableRef.current) {
      const selection = window.getSelection();
      const text = selection.toString().trim();
      
      if (text && text.length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setSelectedText(text);
        setSelectionPos({
          x: rect.left + rect.width/2,
          y: rect.bottom + window.scrollY + 10
        });
        setShowTextSelector(true);
        setTextQuestion(''); // Clear previous question, ensure input box is empty
      }
    }
  };
  
  // Handle text box click to prevent bubbling
  const handleTextBoxClick = (e) => {
    e.stopPropagation();
  };

  // Handle selected text question submission
  const handleTextQuestion = () => {
    if (!textQuestion) return;
    
    // Add to chat history
    setChatHistory(prev => [...prev, {
      type: 'user',
      content: `About "${selectedText}": ${textQuestion}`
    }]);
    
    // Hide question input
    setShowTextSelector(false);
    
    // Simulate AI processing
    setShowWorkflow(true);
    setActiveStep(0);
    
    // Simulate short workflow
    const shortWorkflow = () => {
      let step = 0;
      const interval = setInterval(() => {
        if (step < 5) {
          setActiveStep(step);
          step++;
        } else {
          clearInterval(interval);
          // Show AI suggestion
          setShowSuggestion(true);
          setAiSuggestion(`When optimizing signal peptides, several key factors need to be considered:

1. **Signal Peptide Length**: Research shows that for P. pastoris, the optimal signal peptide length is typically 19-21 amino acids. Too long or too short can affect secretion efficiency.

2. **Charged Amino Acid Distribution**: The N-terminal region should avoid negatively charged amino acids, while adding positively charged amino acids near the C-terminus can improve recognition efficiency.

3. **Hydrophobic Core Region**: Ensure sufficient hydrophobic amino acids (such as Leu, Ile, Val) in the middle of the signal peptide to form a strong hydrophobic core.

4. **Signal Peptidase Cleavage Site Optimization**: Optimize the -3 and -1 position amino acids, with Ala-X-Ala sequence being ideal.

Based on the latest Liu et al. (2023) research, for large proteins, the modified version of SP14 signal peptide, SP14-R3 (replacing alanine at position 8 with valine) can increase secretion efficiency up to 1.4 times the original.`);
        }
      }, 700);
    };
    
    shortWorkflow();
    setTextQuestion('');
  };

  // Apply AI suggestion
  const handleAcceptSuggestion = () => {
    // Replace selected text
    const newContent = editableContent.replace(
      selectedText,
      selectedText + "\n\n**Additional Note:**\n" + aiSuggestion
    );
    
    setEditableContent(newContent);
    setShowSuggestion(false);
    
    // Add to chat history
    setChatHistory(prev => [...prev, {
      type: 'ai',
      content: 'Supplementary information has been added to the document.'
    }]);
  };

  // Regenerate suggestion
  const handleRerunSuggestion = () => {
    // Simulate rerunning
    setShowSuggestion(false);
    setShowWorkflow(true);
    setActiveStep(0);
    
    // Simulate short workflow, generate new suggestion
    setTimeout(() => {
      const newSuggestion = `Recent Zhang et al. (2024) research suggests that for signal peptide optimization, the matching of host preference and target protein characteristics should be considered. For large proteins, especially those containing multiple disulfide bonds, the following points should be prioritized:

1. **Co-translational Translocation Efficiency**: Select signal peptides that promote co-translational translocation, avoiding unstable intermediates during translation.

2. **Secondary Structure Propensity**: Avoid strong secondary structures at the junction between the signal peptide and mature protein, especially β-sheet structures.

3. **Molecular Chaperone Binding Sites**: Optimize signal peptide sequences to enhance interactions with the Sec complex and molecular chaperones.

Their newly developed PichiaSig-12 sequence is recommended, which has shown excellent performance in secreting large proteins, with secretion efficiency 32% higher than the general α-MF.`;
      
      setShowSuggestion(true);
      setAiSuggestion(newSuggestion);
    }, 4000);
  };

  // Render home view
  const renderHome = () => (
    <div className="h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-6">
        Welcome to Bota AI 
        </h1>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto">
        Start By Creating Your First Project To Work With an AI Scientist
        </p>
      </div>
      
      <button 
        onClick={() => setCurrentPage('setup')}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center"
      >
        <Plus className="mr-2" />
        Create Project
      </button>
    </div>
  );

  // Render generating view
  const renderGenerating = () => (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="bg-gray-800 rounded-xl p-10 shadow-2xl max-w-lg text-center space-y-6 border border-blue-500">
        <div className="w-20 h-20 bg-blue-900 rounded-full mx-auto flex items-center justify-center">
          <Sparkles size={32} className="text-blue-400 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-white">Generating Research Plan</h2>
        <p className="text-gray-300">
          AI is creating a detailed research plan based on your project objective: <span className="text-blue-300">"{projectData.objectives[0]}"</span>
        </p>
        <div className="pt-2">
          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full animate-pulse" style={{width: '80%'}}></div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            {['Literature retrieval', 'Method analysis', 'Hypothesis formulation', 'Experimental design', 'Timeline optimization'].map((step, i) => (
              <span key={i} className={`px-3 py-1 rounded-full text-xs ${i < 3 ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'}`}>
                {i < 3 ? '✓ ' : ''}{step}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-900">
      {currentPage === 'home' && renderHome()}
      {currentPage === 'setup' && <SetupWizard onComplete={handleSetupComplete} />}
      {currentPage === 'generating' && renderGenerating()}
      {currentPage === 'workspace' && (
        <div className="h-screen flex flex-col bg-gray-900">
          {/* Header */}
          <header className="bg-gray-800 px-6 py-3 flex items-center justify-between shadow-md">
            <div className="text-white font-medium text-lg">{projectData.name || "Research Project"}</div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  if (window.confirm('Create a new project? Current project data will be saved.')) {
                    localStorage.removeItem('aiScientistProject');
                    localStorage.removeItem('aiScientistResearchPlan');
                    window.location.reload();
                  }
                }}
                className="px-3 py-1.5 bg-blue-600 rounded-md text-white text-sm flex items-center hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                New Project
              </button>
              <button className="px-3 py-1.5 bg-gray-700 rounded-md text-gray-200 text-sm flex items-center">
                <Save className="w-4 h-4 mr-1" />
                Save
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </header>
          
          {/* Main workspace: three-column layout */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left sidebar: file navigation */}
            <FileExplorer 
              projectData={projectData}
              onAddNewFile={handleAddNewFile}
              showNewFileMenu={showNewFileMenu}
              setShowNewFileMenu={setShowNewFileMenu}
              newFileMenuRef={newFileMenuRef}
            />
            
            {/* Middle content area */}
            <DocumentEditor 
              editableContent={editableContent}
              setEditableContent={setEditableContent}
              contentEditableRef={contentEditableRef}
              handleTextSelect={handleTextSelect}
              runningBenchling={runningBenchling}
              handleRunGeneticSimulation={handleRunGeneticSimulation}
              selectedText={selectedText}
              showTextSelector={showTextSelector}
              setShowTextSelector={setShowTextSelector}
              selectionPos={selectionPos}
              textQuestion={textQuestion}
              setTextQuestion={setTextQuestion}
              handleTextQuestion={handleTextQuestion}
              showSuggestion={showSuggestion}
              setShowSuggestion={setShowSuggestion}
              aiSuggestion={aiSuggestion}
              handleAcceptSuggestion={handleAcceptSuggestion}
              handleRerunSuggestion={handleRerunSuggestion}
            />
            
            {/* Right sidebar: AI assistant and workflow */}
            <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
              {/* Workflow part */}
              {showWorkflow && (
                <WorkflowVisualizer 
                  steps={steps}
                  activeStep={activeStep}
                  stepLogs={stepLogs}
                  setShowWorkflow={setShowWorkflow}
                />
              )}
              
              {/* Chat part */}
              <ChatInterface 
                chatHistory={chatHistory}
                userQuery={userQuery}
                setUserQuery={setUserQuery}
                handleAskQuestion={handleAskQuestion}
                showWorkflow={showWorkflow}
                setShowWorkflow={setShowWorkflow}
              />
            </div>
          </div>
          
          {/* Plasmid viewer modal */}
          {showPlasmidViewer && (
            <PlasmidViewer 
              plasmidSequence={plasmidSequence}
              setShowPlasmidViewer={setShowPlasmidViewer}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ScienceAIPlatform;