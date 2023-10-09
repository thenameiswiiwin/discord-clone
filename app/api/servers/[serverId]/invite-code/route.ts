import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { currentProfile } from '@/lib/current-profile';
import { prisma } from '@/lib/db';

async function PATCH(
  request: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse('ServerId is not found', { status: 400 });
    }

    const server = await prisma.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[SERVERS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export { PATCH };
