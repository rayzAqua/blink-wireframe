import React from 'react';
import type { Block, Flow, Screen } from '../../../domain/types';
import { useSelection } from '../../workspace';
import { BlockView } from './BlockView';
import { OverlayView } from './OverlayView';
import './blocks.css';

const isOverlay = (block: Block) =>
  block.type === 'bottomSheet' ||
  block.type === 'modal' ||
  block.type === 'toast';

export interface BlocksRendererProps {
  blocks: Block[];
  flow: Flow;
  screen: Screen;
}

/** Draws a screen layout. Overlays stay inside the device frame, above the scrolling content. */
export const BlocksRenderer: React.FC<BlocksRendererProps> = ({
  blocks,
  screen,
}) => {
  const { selectFlow, selectScreen } = useSelection();

  const go = (target: string) => {
    const slash = target.indexOf('/');
    if (slash === -1) selectScreen(target);
    else selectFlow(target.slice(0, slash), target.slice(slash + 1));
  };
  const ctx = { screen, go };

  return (
    <div className="blocks">
      <div className="blocks__scroll">
        {blocks
          .filter((b) => !isOverlay(b))
          .map((block, index) => (
            <BlockView key={index} block={block} ctx={ctx} />
          ))}
      </div>
      <div className="blocks__overlays">
        {blocks.filter(isOverlay).map((block, index) => (
          <OverlayView key={index} block={block} ctx={ctx} />
        ))}
      </div>
    </div>
  );
};
