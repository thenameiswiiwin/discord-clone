'use client';

import {
  type Channel,
  ChannelType,
  MemberRole,
  type Server,
} from '@prisma/client';
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import type { ModalType } from '@/hooks/use-modal-store';
import { useModal } from '@/hooks/use-modal-store';
import { cn } from '@/lib/utils';

import { ActionTooltip } from '../action-tooltip';

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

function ServerChannel({ channel, server, role }: ServerChannelProps) {
  const { onOpen } = useModal();
  const router = useRouter();
  const params = useParams();

  const Icon = iconMap[channel.type];

  const handleOnClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
  };

  const handleOnAction = (event: React.MouseEvent, action: ModalType) => {
    event.stopPropagation();
    onOpen(action, { channel, server });
  };

  return (
    <button
      onClick={handleOnClick}
      className={cn(
        'group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
        params?.channelId === channel.id && 'bg-zinc-700/20 dark:bg-zinc-700',
      )}
    >
      <Icon className="h-5 w-5 shrink-0 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          'line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
          params?.channelId === channel.id &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-white',
        )}
      >
        {channel.name}
      </p>
      {channel.name !== 'general' && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(event) => handleOnAction(event, 'editChannel')}
              className="hidden h-4 w-4 text-zinc-500 transition hover:text-zinc-600 group-hover:block dark:text-zinc-400 dark:hover:text-zinc-300"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={(event) => handleOnAction(event, 'deleteChannel')}
              className="hidden h-4 w-4 text-zinc-500 transition hover:text-zinc-600 group-hover:block dark:text-zinc-400 dark:hover:text-zinc-300"
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === 'general' && (
        <Lock className="ml-auto h-4 w-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </button>
  );
}

export { ServerChannel };
