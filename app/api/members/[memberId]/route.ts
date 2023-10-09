import { NextResponse } from 'next/server';

import { currentProfile } from '@/lib/current-profile';
import { prisma } from '@/lib/db';

async function DELETE(
  request: Request,
  { params }: { params: { memberId: string } },
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

    if (!params.memberId) {
      return new NextResponse('MemberId is not found', { status: 400 });
    }

    const server = await prisma.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: 'asc',
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[MEMBER_ID_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

async function PATCH(
  request: Request,
  { params }: { params: { memberId: string } },
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(request.url);
    const { role } = await request.json();

    const serverId = searchParams.get('serverId');

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!serverId) {
      return new NextResponse('ServerId is not found', { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse('MemberId is not found', { status: 400 });
    }

    const server = await prisma.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: 'asc',
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[SERVERS_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export { DELETE, PATCH };
