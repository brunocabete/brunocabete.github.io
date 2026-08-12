export const t = {
  nav: {
    home: "Início",
    posts: "Posts",
    tags: "Tags",
    about: "Sobre",
    archives: "Arquivos",
    search: "Buscar",
  },
  post: {
    publishedAt: "Publicado em",
    updatedAt: "Atualizado",
    sharePostIntro: "Compartilhe este post:",
    sharePostOn: "Compartilhe este post no {{platform}}",
    sharePostViaEmail: "Compartilhe este post por e-mail",
    tagLabel: "Tags",
    backToTop: "Voltar ao topo",
    goBack: "Voltar",
    editPage: "Editar página",
    previousPost: "Post anterior",
    nextPost: "Próximo post",
  },
  pagination: {
    prev: "Anterior",
    next: "Próximo",
    page: "Página",
  },
  home: {
    socialLinks: "Links sociais",
    featured: "Destaques",
    recentPosts: "Posts recentes",
    allPosts: "Todos os posts",
  },
  footer: {
    copyright: "Copyright",
    allRightsReserved: "Todos os direitos reservados.",
  },
  pages: {
    tagTitle: "Tag",
    tagDesc: "Todos os artigos com a tag",

    tagsTitle: "Tags",
    tagsDesc: "Todas as tags usadas nos posts.",

    postsTitle: "Posts",
    postsDesc: "Todos os artigos que publiquei.",

    archivesTitle: "Arquivos",
    archivesDesc: "Todos os artigos arquivados.",

    searchTitle: "Buscar",
    searchDesc: "Busque qualquer artigo ...",
  },
  a11y: {
    skipToContent: "Pular para o conteúdo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    toggleTheme: "Alternar tema",
    searchPlaceholder: "Buscar posts...",
    noResults: "Nenhum resultado encontrado",
    goToPreviousPage: "Ir para a página anterior",
    goToNextPage: "Ir para a próxima página",
  },
  notFound: {
    title: "404 Não encontrado",
    message: "Página não encontrada",
    goHome: "Voltar para o início",
  },
} as const;

/**
 * Replace `{{key}}` placeholders in UI strings.
 */
export function tplStr(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = vars[key];
    return value !== undefined && value !== null ? String(value) : "";
  });
}
