// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: true,
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/project-structure',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: true,
      items: [
        'features/screens-overview',
        'features/home-screen',
        'features/authentication',
        'features/product-catalog',
        'features/cart-checkout',
        'features/hana-ai',
        'features/orders-tracking',
        'features/settings',
        'features/wishlist',
        'features/notifications',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        'reference/screens-and-code',
        'reference/faq',
        'reference/support',
        'troubleshooting',
      ],
    },
  ],
};

export default sidebars;
