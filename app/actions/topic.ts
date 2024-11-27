// app/actions/topic.ts
'use server';

import { Topic, TopicGroup, Prisma, PrismaClient, TopicCategory } from '@prisma/client'
import { z } from 'zod';
import { cookies } from 'next/headers';
import { auth } from '@/auth';

const prisma = new PrismaClient();

// Validation schemas
const TopicSchema = z.object({
  topic: z.nativeEnum(TopicCategory),
  goal: z.string()
    .min(10, 'Goal must be at least 10 characters')
    .max(500, 'Goal must be less than 500 characters'),
  probe_level: z.number()
    .min(1, 'Probe level must be at least 1')
    .max(5, 'Probe level must be at most 5'),
});

const TopicGroupSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  topicIds: z.array(z.string())
    .min(1, 'At least one topic must be selected'),
});

type TopicFormState = {
  message?: string | null;
  success?: boolean;
  topicId?: string;
  errors?: {
    topic?: string[];
    goal?: string[];
    probe_level?: string[];
    _form?: string[];
  };
};

type TopicGroupFormState = {
  message?: string | null;
  success?: boolean;
  groupId?: string;
  errors?: {
    title?: string[];
    topicIds?: string[];
    _form?: string[];
  };
};

export type TopicsTableResponse = {
    data: Topic[];
    metadata: {
      totalPages: number;
    };
  };
  
  export type TopicGroupsTableResponse = {
    data: (TopicGroup & { topics: Topic[] })[];
    metadata: {
      totalPages: number;
    };
  };

// Topic Actions
export async function createTopic(prevState: TopicFormState, formData: FormData): Promise<TopicFormState> {
  try {
    const cookieStore = cookies();
    const accountId = cookieStore.get('account_id')?.value;

    if (!accountId) {
      return {
        errors: {
          _form: ['Authentication required'],
        },
      };
    }

    const rawFormData = {
      topic: formData.get('topic')?.toString() as TopicCategory,
      goal: formData.get('goal')?.toString() || '',
      probe_level: Number(formData.get('probe_level')) || 1,
    };

    const validatedFields = TopicSchema.parse(rawFormData);

    const topic = await prisma.topic.create({
      data: {
        topic: validatedFields.topic,
        goal: validatedFields.goal,
        probe_level: validatedFields.probe_level,
        account_id: accountId,
      },
    });

    return {
      success: true,
      topicId: topic.id,
      message: 'Topic created successfully!',
    };

  } catch (error) {
    console.error('Topic creation error:', error);

    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      });

      return {
        errors: fieldErrors as TopicFormState['errors']
      };
    }

    return {
      errors: {
        _form: ['Something went wrong. Please try again.'],
      },
    };
  }
}

export async function fetchTopics(): Promise<Topic[]> {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error('Not authenticated');
    }

    const cookieStore = cookies();
    const account_id = cookieStore.get('account_id')?.value;

    if (!account_id) {
      throw new Error('No account found');
    }

    const topics = await prisma.topic.findMany({
      where: {
        account_id,
      },
      orderBy: {
        topic: 'asc',
      },
    });

    return topics;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw new Error('Failed to fetch topics.');
  }
}

export async function updateTopic(
  id: string,
  prevState: TopicFormState,
  formData: FormData
): Promise<TopicFormState> {
  try {
    const cookieStore = cookies();
    const accountId = cookieStore.get('account_id')?.value;

    if (!accountId) {
      return {
        errors: {
          _form: ['Authentication required'],
        },
      };
    }

    const rawFormData = {
      topic: formData.get('topic')?.toString() as TopicCategory,
      goal: formData.get('goal')?.toString() || '',
      probe_level: Number(formData.get('probe_level')) || 1,
    };

    const validatedFields = TopicSchema.parse(rawFormData);

    const existingTopic = await prisma.topic.findFirst({
      where: {
        id,
        account_id: accountId,
      },
    });

    if (!existingTopic) {
      return {
        errors: {
          _form: ['Topic not found or access denied'],
        },
      };
    }

    await prisma.topic.update({
      where: { id },
      data: {
        topic: validatedFields.topic,
        goal: validatedFields.goal,
        probe_level: validatedFields.probe_level,
      },
    });

    return {
      success: true,
      message: 'Topic updated successfully!',
    };

  } catch (error) {
    console.error('Topic update error:', error);

    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      });

      return {
        errors: fieldErrors as TopicFormState['errors']
      };
    }

    return {
      errors: {
        _form: ['Something went wrong. Please try again.'],
      },
    };
  }
}

// TopicGroup Actions
export async function createTopicGroup(
  prevState: TopicGroupFormState,
  formData: FormData
): Promise<TopicGroupFormState> {
  try {
    const cookieStore = cookies();
    const accountId = cookieStore.get('account_id')?.value;

    if (!accountId) {
      return {
        errors: {
          _form: ['Authentication required'],
        },
      };
    }

    const rawFormData = {
      title: formData.get('title')?.toString() || '',
      topicIds: formData.getAll('topicIds').map(id => id.toString()),
    };

    const validatedFields = TopicGroupSchema.parse(rawFormData);

    const topicGroup = await prisma.topicGroup.create({
      data: {
        title: validatedFields.title,
        account_id: accountId,
        topics: {
          connect: validatedFields.topicIds.map(id => ({ id })),
        },
      },
    });

    return {
      success: true,
      groupId: topicGroup.id,
      message: 'Topic group created successfully!',
    };

  } catch (error) {
    console.error('Topic group creation error:', error);

    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      });

      return {
        errors: fieldErrors as TopicGroupFormState['errors']
      };
    }

    return {
      errors: {
        _form: ['Something went wrong. Please try again.'],
      },
    };
  }
}

export async function fetchTopicGroups(): Promise<(TopicGroup & { topics: Topic[] })[]> {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error('Not authenticated');
    }

    const cookieStore = cookies();
    const account_id = cookieStore.get('account_id')?.value;

    if (!account_id) {
      throw new Error('No account found');
    }

    const topicGroups = await prisma.topicGroup.findMany({
      where: {
        account_id,
      },
      include: {
        topics: true,
      },
      orderBy: {
        title: 'asc',
      },
    });

    return topicGroups;
  } catch (error) {
    console.error('Error fetching topic groups:', error);
    throw new Error('Failed to fetch topic groups.');
  }
}

export async function updateTopicGroup(
  id: string,
  prevState: TopicGroupFormState,
  formData: FormData
): Promise<TopicGroupFormState> {
  try {
    const cookieStore = cookies();
    const accountId = cookieStore.get('account_id')?.value;

    if (!accountId) {
      return {
        errors: {
          _form: ['Authentication required'],
        },
      };
    }

    const rawFormData = {
      title: formData.get('title')?.toString() || '',
      topicIds: formData.getAll('topicIds').map(id => id.toString()),
    };

    const validatedFields = TopicGroupSchema.parse(rawFormData);

    const existingGroup = await prisma.topicGroup.findFirst({
      where: {
        id,
        account_id: accountId,
      },
    });

    if (!existingGroup) {
      return {
        errors: {
          _form: ['Topic group not found or access denied'],
        },
      };
    }

    await prisma.topicGroup.update({
      where: { id },
      data: {
        title: validatedFields.title,
        topics: {
          set: validatedFields.topicIds.map(id => ({ id })),
        },
      },
    });

    return {
      success: true,
      message: 'Topic group updated successfully!',
    };

  } catch (error) {
    console.error('Topic group update error:', error);

    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      });

      return {
        errors: fieldErrors as TopicGroupFormState['errors']
      };
    }

    return {
      errors: {
        _form: ['Something went wrong. Please try again.'],
      },
    };
  }
}

export async function deleteTopicGroup(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const cookieStore = cookies();
    const accountId = cookieStore.get('account_id')?.value;

    if (!accountId) {
      throw new Error('Authentication required');
    }

    const existingGroup = await prisma.topicGroup.findFirst({
      where: {
        id,
        account_id: accountId,
      },
    });

    if (!existingGroup) {
      throw new Error('Topic group not found or access denied');
    }

    await prisma.topicGroup.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Topic group deleted successfully',
    };

  } catch (error) {
    console.error('Error deleting topic group:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete topic group',
    };
  }
}

export async function fetchPaginatedTopics(
    query: string = '',
    page: number = 1,
  ): Promise<TopicsTableResponse> {
    try {
      const session = await auth();
      if (!session?.user) {
        throw new Error('Not authenticated');
      }
  
      const cookieStore = cookies();
      const account_id = cookieStore.get('account_id')?.value;
  
      if (!account_id) {
        throw new Error('No account found');
      }
  
      const ITEMS_PER_PAGE = 10;
      const offset = (page - 1) * ITEMS_PER_PAGE;
  
      const where: Prisma.TopicWhereInput = {
        account_id,
        OR: query ? [
          { goal: { contains: query, mode: 'insensitive' } },
        ] : undefined,
      };
  
      const [topics, totalItems] = await Promise.all([
        prisma.topic.findMany({
          where,
          orderBy: {
            topic: 'asc',
          },
          take: ITEMS_PER_PAGE,
          skip: offset,
        }),
        prisma.topic.count({ where })
      ]);
  
      return {
        data: topics,
        metadata: {
          totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
        },
      };
    } catch (error) {
      console.error('Error fetching topics:', error);
      throw new Error('Failed to fetch topics.');
    } finally {
      await prisma.$disconnect();
    }
  }
  
  export async function fetchTopicPages(
    query: string = '',
  ): Promise<number> {
    try {
      const session = await auth();
      if (!session?.user) {
        throw new Error('Not authenticated');
      }
  
      const cookieStore = cookies();
      const account_id = cookieStore.get('account_id')?.value;
  
      if (!account_id) {
        throw new Error('No account found');
      }
  
      const ITEMS_PER_PAGE = 10;
  
      const where: Prisma.TopicWhereInput = {
        account_id,
        OR: query ? [
          { goal: { contains: query, mode: 'insensitive' } },
        ] : undefined,
      };
  
      const totalItems = await prisma.topic.count({ where });
  
      return Math.ceil(totalItems / ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching topic pages:', error);
      throw new Error('Failed to fetch topic pages.');
    }
  }
  
  export async function fetchPaginatedTopicGroups(
    query: string = '',
    page: number = 1,
  ): Promise<TopicGroupsTableResponse> {
    try {
      const session = await auth();
      if (!session?.user) {
        throw new Error('Not authenticated');
      }
  
      const cookieStore = cookies();
      const account_id = cookieStore.get('account_id')?.value;
  
      if (!account_id) {
        throw new Error('No account found');
      }
  
      const ITEMS_PER_PAGE = 10;
      const offset = (page - 1) * ITEMS_PER_PAGE;
  
      const where: Prisma.TopicGroupWhereInput = {
        account_id,
        OR: query ? [
          { title: { contains: query, mode: 'insensitive' } },
        ] : undefined,
      };
  
      const [topicGroups, totalItems] = await Promise.all([
        prisma.topicGroup.findMany({
          where,
          include: {
            topics: true,
          },
          orderBy: {
            title: 'asc',
          },
          take: ITEMS_PER_PAGE,
          skip: offset,
        }),
        prisma.topicGroup.count({ where })
      ]);
  
      return {
        data: topicGroups,
        metadata: {
          totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
        },
      };
    } catch (error) {
      console.error('Error fetching topic groups:', error);
      throw new Error('Failed to fetch topic groups.');
    } finally {
      await prisma.$disconnect();
    }
  }
  
  export async function fetchTopicGroupPages(
    query: string = '',
  ): Promise<number> {
    try {
      const session = await auth();
      if (!session?.user) {
        throw new Error('Not authenticated');
      }
  
      const cookieStore = cookies();
      const account_id = cookieStore.get('account_id')?.value;
  
      if (!account_id) {
        throw new Error('No account found');
      }
  
      const ITEMS_PER_PAGE = 10;
  
      const where: Prisma.TopicGroupWhereInput = {
        account_id,
        OR: query ? [
          { title: { contains: query, mode: 'insensitive' } },
        ] : undefined,
      };
  
      const totalItems = await prisma.topicGroup.count({ where });
  
      return Math.ceil(totalItems / ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching topic group pages:', error);
      throw new Error('Failed to fetch topic group pages.');
    }
  }
  
  type DeleteFormState = {
    message: string | null;
    success?: boolean;
    errors?: {
      _form?: string[];
    };
  };

  export async function deleteTopic(
    prevState: DeleteFormState,
    formData: FormData
  ): Promise<DeleteFormState> {
    try {
      const topicId = formData.get('id')?.toString();
  
      if (!topicId) {
        return {
          message: null,
          errors: {
            _form: ['Topic ID is required'],
          },
        };
      }
  
      const cookieStore = cookies();
      const accountId = cookieStore.get('account_id')?.value;
  
      if (!accountId) {
        return {
          message: null,
          errors: {
            _form: ['Authentication required'],
          },
        };
      }
  
      const topic = await prisma.topic.findFirst({
        where: {
          id: topicId,
          account_id: accountId,
        },
      });
  
      if (!topic) {
        return {
          message: null,
          errors: {
            _form: ['Topic not found or access denied'],
          },
        };
      }
  
      await prisma.topic.delete({
        where: {
          id: topicId,
        },
      });
  
      return {
        message: 'Topic deleted successfully',
        success: true
      };
  
    } catch (error) {
      console.error('Error deleting topic:', error);
      return {
        message: null,
        errors: {
          _form: ['Failed to delete topic'],
        },
      };
    } finally {
      await prisma.$disconnect();
    }
  }
  