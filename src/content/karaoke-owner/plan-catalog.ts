import type { Block } from '../../domain/types.ts';

/** Plan catalog given by the product owner (see the Owner layout blocks design, section "Plan catalog"). */
export interface PlanFact {
  name: string;
  monthly: string;
  yearly: string;
  staff: string;
  max360: boolean;
}

export const PLANS: PlanFact[] = [
  {
    name: 'BASIC',
    monthly: 'Miễn phí',
    yearly: 'Miễn phí',
    staff: '5 nhân sự',
    max360: false,
  },
  {
    name: 'Pro',
    monthly: '5.000.000đ/tháng',
    yearly: '2.500.000đ/tháng (30.000.000đ/năm)',
    staff: '10 nhân sự',
    max360: true,
  },
  {
    name: 'Pro Max',
    monthly: '10.000.000đ/tháng',
    yearly: '5.000.000đ/tháng (60.000.000đ/năm)',
    staff: '30 nhân sự',
    max360: true,
  },
  {
    name: 'Pro Ultra',
    monthly: '20.000.000đ/tháng',
    yearly: '10.000.000đ/tháng (120.000.000đ/năm)',
    staff: '99 nhân sự',
    max360: true,
  },
  {
    name: 'Pro Ultra +',
    monthly: '20.000.000đ/tháng',
    yearly: '10.000.000đ/tháng (120.000.000đ/năm)',
    staff: 'Không giới hạn; từ người thứ 100: 99.000đ/người/tháng',
    max360: true,
  },
];

/** One card per plan with the monthly price, the yearly price, the staff limit and Max360. */
export function planCards(goto: string): Block {
  return {
    type: 'cardList',
    items: PLANS.map((plan) => ({
      icon: 'wallet' as const,
      title: plan.name,
      subtitle: `Theo tháng: ${plan.monthly} · Theo năm: ${plan.yearly} · ${plan.staff} · ${plan.max360 ? 'Có Max360' : 'Không Max360'}`,
      goto,
    })),
  };
}
