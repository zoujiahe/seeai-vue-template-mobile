export function DemoConstructRoute (path = '/demo-construct', name?) {
  return {
    path,
    component: () => import(/* webpackChunkName: "demo-construct" */ './demo-construct.vue'),
    name: name || 'demo-construct',
    meta: {
      name: '示例结构样本'
    }
  }
}
