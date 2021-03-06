import { PanelStoreConstructor } from '@/Stores/PanelStore';
import { Icon, Tag, Tooltip } from '@blueprintjs/core';
import classnames from 'classnames';
import React, { FunctionComponent, memo } from 'react';
import { DDPLogDirection } from './DDPLogDirection';
import { DDPLogPreview } from './DDPLogPreview';

interface Props extends DDPLog {
  log: DDPLog;
  isNew: boolean;
  isStarred: boolean;
  store: PanelStoreConstructor;
}

export const DDPLog: FunctionComponent<Props> = memo(
  ({
    hash,
    isInbound,
    isNew,
    isOutbound,
    isStarred,
    log,
    sizePretty,
    store,
    timestampPretty,
    trace,
  }) => {
    const classes = classnames('mde-ddp__log-row', {
      'mde-ddp__log-row--new': isNew,
      'mde-ddp__log-row--starred': isStarred,
    });

    return (
      <div className={classes}>
        <div className='time'>
          <small>{timestampPretty}</small>
        </div>
        <div className='direction'>
          <DDPLogDirection isOutbound={isOutbound} isInbound={isInbound} />
        </div>
        <div className='content'>
          <DDPLogPreview log={log} store={store} />
        </div>

        <div className='size'>
          <Tag minimal>{sizePretty}</Tag>
        </div>

        <div className='interactions'>
          <Tooltip
            content='View Stack Trace'
            hoverOpenDelay={800}
            position='top'
          >
            <Icon
              icon='eye-open'
              onClick={() => trace && store.setActiveStackTrace(trace)}
            />
          </Tooltip>
          <Tooltip content='Star & Keep' hoverOpenDelay={800} position='top'>
            {isStarred ? (
              <Icon
                icon='star'
                onClick={() => store.bookmarkStore.remove(log)}
              />
            ) : (
              <Icon
                icon='star-empty'
                onClick={() => store.bookmarkStore.add(log)}
              />
            )}
          </Tooltip>
        </div>

        {hash && (
          <div className='hash'>
            <Tooltip content='CRC32' hoverOpenDelay={800} position='top'>
              <Tag
                minimal
                interactive
                onClick={() => {
                  navigator.clipboard.writeText(hash).catch(console.error);
                }}
              >
                {hash}
              </Tag>
            </Tooltip>
          </div>
        )}
      </div>
    );
  },
);
