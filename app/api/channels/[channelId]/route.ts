import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';

import { currentProfile } from '@/lib/current-profile';
import { prisma } from '@/lib/db';

async function DELETE(
  request: Request,
  { params }: { params: { channelId: string } },
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(request.url);

    const serverId = searchParams.get('serverId');

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!serverId) {
      return new NextResponse('ServerId is not found', { status: 400 });
    }

    if (!params.channelId) {
      return new NextResponse('ChannelId is not found', { status: 400 });
    }

    const server = await prisma.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: 'general',
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[CHANNEL_ID_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

async function PATCH(
  request: Request,
  { params }: { params: { channelId: string } },
) {
  try {
    const profile = await currentProfile();
    const { name, type } = await request.json();
    const { searchParams } = new URL(request.url);

    const serverId = searchParams.get('serverId');

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!serverId) {
      return new NextResponse('ServerId is not found', { status: 400 });
    }

    if (!params.channelId) {
      return new NextResponse('ChannelId is not found', { status: 400 });
    }

    if (name === 'general') {
      return new NextResponse('Channel name cannot be "general"', {
        status: 400,
      });
    }

    const server = await prisma.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
              NOT: {
                name: 'general',
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[CHANNEL_ID_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export { DELETE, PATCH };
