export const mockTruthTreeData = {
  nodes: [
    {
      id: 'main-claim',
      title: 'Climate Change Impact',
      description: 'The main claim about climate change effects',
      type: 'main-claim',
      status: 'verified'
    },
    {
      id: 'source-1',
      title: 'IPCC Report 2023',
      description: 'Intergovernmental Panel on Climate Change official report',
      type: 'research',
      status: 'verified'
    },
    {
      id: 'source-2',
      title: 'NASA Climate Data',
      description: 'Data collected by NASA on global temperature changes',
      type: 'data',
      status: 'verified'
    },
    {
      id: 'source-3',
      title: 'News Article - NY Times',
      description: 'New York Times article on climate policy',
      type: 'news',
      status: 'verified'
    },
    {
      id: 'source-4',
      title: 'Scientific Paper - Nature',
      description: 'Research paper published in Nature journal',
      type: 'research',
      status: 'verified'
    },
    {
      id: 'source-5',
      title: 'Tweet from Climate Scientist',
      description: 'Statement from Dr. Michael Smith on recent findings',
      type: 'social',
      status: 'unverified'
    },
    {
      id: 'source-6',
      title: 'UN Environment Report',
      description: 'United Nations report on environmental changes',
      type: 'report',
      status: 'verified'
    },
    {
      id: 'source-7',
      title: 'Blog Post - Climate Skeptic',
      description: 'Contrarian viewpoint on climate change data',
      type: 'blog',
      status: 'disputed'
    },
    {
      id: 'source-8',
      title: 'Environmental NGO Statement',
      description: 'Position paper by GreenEarth organization',
      type: 'organization',
      status: 'unverified'
    },
    {
      id: 'source-9',
      title: 'Government Policy Document',
      description: 'Official climate policy from government agency',
      type: 'policy',
      status: 'verified'
    },
    {
      id: 'source-10',
      title: 'Industry Research',
      description: 'Research conducted by energy sector company',
      type: 'industry',
      status: 'unverified'
    },
    {
      id: 'source-11',
      title: 'Academic Study',
      description: 'University research on climate impacts',
      type: 'research',
      status: 'verified'
    },
    {
      id: 'source-12',
      title: 'YouTube Explanation',
      description: 'Educational video explaining climate science',
      type: 'video',
      status: 'unverified'
    },
    {
      id: 'source-13',
      title: 'Historical Temperature Data',
      description: 'Long-term temperature records from multiple sources',
      type: 'data',
      status: 'verified'
    }
  ],
  links: [
    { source: 'main-claim', target: 'source-1' },
    { source: 'main-claim', target: 'source-2' },
    { source: 'main-claim', target: 'source-3' },
    { source: 'main-claim', target: 'source-4' },
    { source: 'main-claim', target: 'source-5' },
    { source: 'main-claim', target: 'source-6' },
    { source: 'source-1', target: 'source-7' },
    { source: 'source-2', target: 'source-8' },
    { source: 'source-3', target: 'source-9' },
    { source: 'source-4', target: 'source-10' },
    { source: 'source-5', target: 'source-11' },
    { source: 'source-6', target: 'source-12' },
    { source: 'source-1', target: 'source-13' },
  ]
};