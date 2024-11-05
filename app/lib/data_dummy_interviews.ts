import { Interview } from "./definitions";


export async function fetchInterviews(query: string, currentPage: number) {
    const interviews: Interview[] = [
      {
        id: "I001",
        date: "2024-11-15",
        subject: "User Experience Research",
        description: "Investigation of user interactions with new mobile app features",
        group_size: 1,
        participant_ids: ["P001"],
        is_open_ended: true,
        company: "TechCorp",
        industry: "Software",
        key_questions: ["What challenges did you face?", "How would you improve it?"],
        status: "published",
        interviewer_style: "friendly",
        is_structured: true,
        scenario_setting: "Remote video call",
        desired_response_depth: "in_depth",
        conversation_flow: "linear",
        invite_code: "UX24NOV15"
      },
      {
        id: "I002",
        date: "2024-11-16",
        subject: "Customer Satisfaction Survey",
        description: "Annual feedback collection from premium tier customers",
        group_size: 3,
        participant_ids: ["P002", "P003", "P004"],
        is_open_ended: false,
        company: "RetailCo",
        industry: "Retail",
        key_questions: ["Rate our service", "Would you recommend us?"],
        status: "draft",
        interviewer_style: "formal",
        is_structured: true,
        scenario_setting: "In-person office meeting",
        desired_response_depth: "moderate",
        conversation_flow: "linear",
        invite_code: "CS24NOV16"
      },
      {
        id: "I003",
        date: "2024-11-17",
        subject: "Product Development Focus Group",
        description: "Gathering insights for new product features",
        group_size: 5,
        participant_ids: ["P005", "P006", "P007", "P008", "P009"],
        is_open_ended: true,
        company: "InnovateInc",
        industry: "Technology",
        key_questions: ["What features would you add?", "How does this compare to competitors?"],
        status: "published",
        interviewer_style: "probing",
        is_structured: false,
        scenario_setting: "Innovation lab",
        desired_response_depth: "in_depth",
        conversation_flow: "tangential",
        invite_code: "PD24NOV17"
      },
      {
        id: "I004",
        date: "2024-11-18",
        subject: "Employee Satisfaction",
        description: "Quarterly employee wellness check-in",
        group_size: 1,
        participant_ids: ["P010"],
        is_open_ended: true,
        company: "CorpCo",
        industry: "Finance",
        key_questions: ["How's your work-life balance?", "What support do you need?"],
        status: "published",
        interviewer_style: "friendly",
        is_structured: false,
        scenario_setting: "Private meeting room",
        desired_response_depth: "moderate",
        conversation_flow: "tangential",
        invite_code: "ES24NOV18"
      },
      {
        id: "I005",
        date: "2024-11-19",
        subject: "Market Research",
        description: "Competitive analysis interview",
        group_size: 2,
        participant_ids: ["P001", "P002"],
        is_open_ended: false,
        company: "MarketSense",
        industry: "Consulting",
        key_questions: ["What's your market position?", "Who are your competitors?"],
        status: "draft",
        interviewer_style: "formal",
        is_structured: true,
        scenario_setting: "Virtual conference room",
        desired_response_depth: "in_depth",
        conversation_flow: "linear",
        invite_code: "MR24NOV19"
      }
    ];
  
    try {
      // Filter interviews based on search query
      const filteredInterviews = interviews.filter(interview => {
        const searchStr = query.toLowerCase();
        return (
          interview.subject.toLowerCase().includes(searchStr) ||
          interview.description.toLowerCase().includes(searchStr) ||
          interview.company.toLowerCase().includes(searchStr) ||
          interview.industry.toLowerCase().includes(searchStr)
        );
      });
  
      // Calculate pagination
      const ITEMS_PER_PAGE = 6;
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;
      const paginatedInterviews = filteredInterviews.slice(
        offset,
        offset + ITEMS_PER_PAGE
      );
  
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
  
      return paginatedInterviews;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch interviews.');
    }
  }
  
  export default fetchInterviews;