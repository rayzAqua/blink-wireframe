import React from 'react';
import { BottomSheet, Button, Toast } from '../../../shared/ui';
import type { Block } from '../../../domain/types';
import { BlockView } from './BlockView';
import type { BlockContext } from './BlockView';

const noop = () => undefined;

/** Draws a sheet, modal or toast that is shown open inside the device frame. */
export function OverlayView({
  block,
  ctx,
}: {
  block: Block;
  ctx: BlockContext;
}): React.ReactElement | null {
  switch (block.type) {
    case 'bottomSheet':
      return (
        <BottomSheet isOpen inline onClose={noop} title={block.title}>
          {block.blocks.map((inner, index) => (
            <BlockView key={index} block={inner} ctx={ctx} />
          ))}
        </BottomSheet>
      );
    case 'modal':
      return (
        <div className="blocks__modal-backdrop">
          <div className="blocks__modal" role="dialog" aria-label={block.title}>
            <h3 className="blocks__heading">{block.title}</h3>
            {block.blocks.map((inner, index) => (
              <BlockView key={index} block={inner} ctx={ctx} />
            ))}
            {block.buttons && (
              <div className="blocks__actions">
                {block.buttons.map((button, index) => (
                  <Button
                    key={`${button.label}-${index}`}
                    variant={
                      button.variant ?? (index === 0 ? 'primary' : 'secondary')
                    }
                    fullWidth
                    onClick={() => button.goto && ctx.go(button.goto)}
                  >
                    {button.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    case 'toast':
      return (
        <Toast isOpen inline duration={0} message={block.text} onClose={noop} />
      );
    default:
      return null;
  }
}
