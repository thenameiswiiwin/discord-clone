import { redirect } from 'next/navigation';

import { initialProfile } from '@/lib/auth';
import { prisma } from '@/lib/db';

export default async function SetupPage() {
  const profile = await initialProfile();

  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/server/${server.id}`);
  }

  return <div>Create a Server</div>;
}
