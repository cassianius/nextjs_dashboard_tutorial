export async function fetchParticipants(query: string, currentPage: number) {

    const participants = [
      {
        id: "P001",
        first: "John",
        last: "Smith",
        email: "john.smith@email.com",
        phone: "(212) 555-0101"
      },
      {
        id: "P002",
        first: "Emma",
        last: "Johnson",
        email: "emma.j@email.com",
        phone: "(347) 555-0102"
      },
      {
        id: "P003",
        first: "Michael",
        last: "Davis",
        email: "michael.davis@email.com",
        phone: "(415) 555-0103"
      },
      {
        id: "P004",
        first: "Sarah",
        last: "Wilson",
        email: "sarah.w@email.com",
        phone: "(310) 555-0104"
      },
      {
        id: "P005",
        first: "David",
        last: "Brown",
        email: "david.brown@email.com",
        phone: "(312) 555-0105"
      },
      {
        id: "P006",
        first: "Lisa",
        last: "Anderson",
        email: "lisa.a@email.com",
        phone: "(617) 555-0106"
      },
      {
        id: "P007",
        first: "Robert",
        last: "Taylor",
        email: "robert.t@email.com",
        phone: "(713) 555-0107"
      },
      {
        id: "P008",
        first: "Jennifer",
        last: "Martinez",
        email: "jennifer.m@email.com",
        phone: "(305) 555-0108"
      },
      {
        id: "P009",
        first: "William",
        last: "Garcia",
        email: "william.g@email.com",
        phone: "(404) 555-0109"
      },
      {
        id: "P010",
        first: "Maria",
        last: "Rodriguez",
        email: "maria.r@email.com",
        phone: "(206) 555-0110"
      }
    ];
  
    try {
      // Filter participants based on search query
      const filteredParticipants = participants.filter(participant => {
        const searchStr = query.toLowerCase();
        return (
          participant.first.toLowerCase().includes(searchStr) ||
          participant.last.toLowerCase().includes(searchStr) ||
          participant.email.toLowerCase().includes(searchStr) ||
          participant.phone.toLowerCase().includes(searchStr)
        );
      });
  
      // Calculate pagination
      const ITEMS_PER_PAGE = 6;
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;
      const paginatedParticipants = filteredParticipants.slice(
        offset,
        offset + ITEMS_PER_PAGE
      );
  
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
  
      return paginatedParticipants;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch participants.');
    }
  }
  
  export default fetchParticipants;


  