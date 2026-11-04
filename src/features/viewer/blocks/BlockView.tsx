import React from 'react';
import { ChevronLeft } from 'lucide-react';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  Checkbox,
  EmptyState,
  Input,
  ListGroup,
  ListRow,
  Progress,
  RadioGroup,
  Select,
  Skeleton,
  Stepper,
  Switch,
  Table,
  Tabs,
  Textarea,
} from '../../../shared/ui';
import type { Block, ButtonSpec, Screen } from '../../../domain/types';
import { renderIcon } from './icons';

export interface BlockContext {
  screen: Screen;
  go: (target: string) => void;
}

const noop = () => undefined;

function Buttons({
  buttons,
  ctx,
}: {
  buttons: ButtonSpec[];
  ctx: BlockContext;
}) {
  return (
    <div className="blocks__actions">
      {buttons.map((button, index) => (
        <Button
          key={`${button.label}-${index}`}
          variant={button.variant ?? (index === 0 ? 'primary' : 'secondary')}
          fullWidth
          onClick={() => button.goto && ctx.go(button.goto)}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
}

/** Draws one non-overlay block. Overlay blocks are drawn by OverlayView. */
export function BlockView({
  block,
  ctx,
}: {
  block: Block;
  ctx: BlockContext;
}): React.ReactElement | null {
  switch (block.type) {
    case 'appBar': {
      const isPublic = ctx.screen.environment === 'WEB_PUBLIC';
      return (
        <header className="blocks__app-bar">
          {block.back && !isPublic && (
            <ChevronLeft size={20} aria-label="Quay lại" />
          )}
          <h2 className="blocks__app-bar-title">{block.title}</h2>
          {!isPublic &&
            block.actions?.map((name) => (
              <span key={name}>{renderIcon(name, 18)}</span>
            ))}
        </header>
      );
    }
    case 'hero': {
      const content = (
        <>
          {block.cover && <div className="blocks__hero-cover" />}
          <div className="blocks__hero-body">
            {block.logo && (
              <Avatar name={block.title} shape="rounded" size="lg" />
            )}
            <div className="blocks__hero-text">
              <h3 className="blocks__hero-title">
                {block.title}
                {block.verified && (
                  <span className="blocks__tick" title="Cơ sở đã xác minh">
                    ✔
                  </span>
                )}
              </h3>
              {block.planTag && (
                <Badge variant="neutral">{block.planTag}</Badge>
              )}
              {block.lines?.map((line) => (
                <p key={line} className="blocks__muted">
                  {line}
                </p>
              ))}
              {block.status && (
                <Badge variant="success" withDot>
                  {block.status}
                </Badge>
              )}
            </div>
          </div>
        </>
      );
      return block.goto ? (
        <button
          type="button"
          className="blocks__hero blocks__hero--tap"
          onClick={() => ctx.go(block.goto as string)}
        >
          {content}
        </button>
      ) : (
        <div className="blocks__hero">{content}</div>
      );
    }
    case 'heading':
      return <h3 className="blocks__heading">{block.text}</h3>;
    case 'text':
      return (
        <p className={block.muted ? 'blocks__muted' : 'blocks__text'}>
          {block.text}
        </p>
      );
    case 'keyValue':
      return (
        <Card>
          <CardBody className="blocks__kv">
            {block.rows.map((row) => (
              <div key={row.label} className="blocks__kv-row">
                <span className="blocks__muted">{row.label}</span>
                <span className="blocks__kv-value">{row.value}</span>
              </div>
            ))}
          </CardBody>
        </Card>
      );
    case 'listGroup':
      return (
        <ListGroup label={block.label}>
          {block.rows.map((row, index) => {
            return (
              <ListRow
                key={`${row.title}-${index}`}
                icon={row.icon ? renderIcon(row.icon, 18) : undefined}
                title={row.title}
                description={row.description}
                trailing={
                  row.badge ? (
                    <Badge variant="neutral">{row.badge}</Badge>
                  ) : undefined
                }
                showChevron={row.chevron ?? Boolean(row.goto)}
                disabled={row.disabled}
                danger={row.tone === 'danger'}
                onClick={
                  row.goto ? () => ctx.go(row.goto as string) : undefined
                }
              />
            );
          })}
        </ListGroup>
      );
    case 'field':
      return <FieldView block={block} />;
    case 'tabs':
      return (
        <Tabs
          fullWidth
          value={String(block.active)}
          onChange={noop}
          items={block.items.map((label, index) => ({
            value: String(index),
            label,
          }))}
        />
      );
    case 'stepper':
      return (
        <Stepper
          current={block.current}
          steps={block.steps.map((label) => ({ label }))}
        />
      );
    case 'progress':
      return <Progress label={block.label} value={block.value} showValue />;
    case 'cardList':
      return (
        <div className="blocks__cards">
          {block.items.map((item, index) => {
            const body = (
              <>
                {item.icon && renderIcon(item.icon, 18)}
                <span className="blocks__card-text">
                  <strong>{item.title}</strong>
                  {item.subtitle && (
                    <span className="blocks__muted">{item.subtitle}</span>
                  )}
                </span>
                {item.badge && (
                  <Badge variant={badgeVariant(item.tone)}>{item.badge}</Badge>
                )}
              </>
            );
            return item.goto ? (
              <button
                key={`${item.title}-${index}`}
                type="button"
                className="blocks__card blocks__card--tap"
                onClick={() => ctx.go(item.goto as string)}
              >
                {body}
              </button>
            ) : (
              <div key={`${item.title}-${index}`} className="blocks__card">
                {body}
              </div>
            );
          })}
        </div>
      );
    case 'table':
      return (
        <Table
          dense
          rowKey={(row) => row.join('|')}
          columns={block.columns.map((header, index) => ({
            key: String(index),
            header,
            render: (row: string[]) => row[index],
          }))}
          rows={block.rows}
        />
      );
    case 'alert':
      return (
        <Alert
          variant={block.variant}
          title={block.title}
          action={
            block.actionLabel ? (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => block.goto && ctx.go(block.goto)}
              >
                {block.actionLabel}
              </Button>
            ) : undefined
          }
        >
          {block.text}
        </Alert>
      );
    case 'empty': {
      return (
        <EmptyState
          icon={block.icon ? renderIcon(block.icon, 28) : undefined}
          title={block.title}
          description={block.text}
          action={
            block.actionLabel ? (
              <Button
                size="sm"
                onClick={() => block.goto && ctx.go(block.goto)}
              >
                {block.actionLabel}
              </Button>
            ) : undefined
          }
        />
      );
    }
    case 'skeleton':
      return (
        <div className="blocks__skeleton">
          <Skeleton variant="rect" height={96} />
          <Skeleton variant="text" lines={block.lines ?? 3} />
        </div>
      );
    case 'actions':
      return <Buttons buttons={block.buttons} ctx={ctx} />;
    default:
      return null;
  }
}

function badgeVariant(
  tone?: string,
): 'neutral' | 'info' | 'success' | 'warning' | 'danger' {
  return tone === 'info' ||
    tone === 'success' ||
    tone === 'warning' ||
    tone === 'danger'
    ? tone
    : 'neutral';
}

function FieldView({ block }: { block: Extract<Block, { type: 'field' }> }) {
  switch (block.kind) {
    case 'textarea':
      return (
        <Textarea
          label={block.label}
          defaultValue={block.value}
          placeholder={block.placeholder}
          helperText={block.helper}
          error={block.error}
          readOnly
        />
      );
    case 'select':
      return (
        <Select
          label={block.label}
          defaultValue={block.value}
          helperText={block.helper}
          error={block.error}
          options={(block.options ?? [block.value ?? '']).map((option) => ({
            value: option,
            label: option,
          }))}
        />
      );
    case 'switch':
      return (
        <Switch
          checked={Boolean(block.checked)}
          onChange={noop}
          label={block.label}
          description={block.helper}
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          checked={Boolean(block.checked)}
          onChange={noop}
          label={block.label}
          description={block.helper}
        />
      );
    case 'radio':
      return (
        <div>
          <p className="blocks__field-label">{block.label}</p>
          <RadioGroup
            name={block.label}
            value={block.value ?? ''}
            onChange={noop}
            options={(block.options ?? []).map((option) => ({
              value: option,
              label: option,
            }))}
          />
        </div>
      );
    default:
      return (
        <Input
          label={block.label}
          defaultValue={block.value}
          placeholder={block.placeholder}
          helperText={block.helper}
          error={block.error}
          readOnly
        />
      );
  }
}
