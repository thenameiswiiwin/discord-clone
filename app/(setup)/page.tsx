import { redirect } from 'next/navigation';

import { InitialModal } from '@/components/modals/initial-modal';
import { initialProfile } from '@/lib/auth';
import { prisma } from '@/lib/db';

async function SetupPage() {
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

  return <InitialModal />;
}

export default SetupPage;
