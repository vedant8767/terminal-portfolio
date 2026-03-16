export const fileSystem = {
  name: "/",
  type: "dir",
  children: {
    home: {
      type: "dir",
      children: {
        vedant: {
          type: "dir",
          children: {
            "about.txt": {
              type: "file",
              content:
                "Hi, I'm Vedant Bhadkamkar\nFrontend Developer\nReact / Next.js"
            },
            "contact.txt": {
              type: "file",
              content:
                "Email: vedant@email.com\nGithub: github.com/vedant"
            },
            projects: {
              type: "dir",
              children: {
                "terminal-portfolio.txt": {
                  type: "file",
                  content: "Terminal style developer portfolio"
                }
              }
            }
          }
        }
      }
    }
  }
}