import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://brunocabete.github.io",
    title: "Bruno Cabete ",
    description: "Software Engineer",
    author: "Bruno Cabete",
    profile: "https://brunocabete.github.io",
    ogImage: "default-og.jpg",
    lang: "pt-BR",
    timezone: "America/Sao_Paulo",
    dir: "ltr",
  },
  posts: {
    perPage: 10,
    perIndex: 5,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: false,
    showBackButton: true,
    editPost: {
      enabled: false,
      // url: "https://github.com/brunocabete/brunocabete.github.io/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/brunocabete" },
    { name: "linkedin", url: "https://www.linkedin.com/in/bruno-cabete/" },
  ],
  // shareLinks: [
  //   { name: "whatsapp", url: "https://wa.me/?text=" },
  //   { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
  //   { name: "x",        url: "https://x.com/intent/post?url=" },
  //   { name: "telegram", url: "https://t.me/share/url?url=" },
  //   { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
  //   { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  // ],
});