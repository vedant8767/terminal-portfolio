export function runCommand(cmd, context) {
  const { cwd, setCwd } = context;

  const args = cmd.trim().split(" ");
  const command = args[0];

  if (command === "help") {
    return `
Available commands:

help
about
projects
skills
contact
ls
cd
cat
clear
theme
time
whoami
pwd
`;
  }

  if (command === "about") {
    return "Hi I'm Vedant.\nFrontend Developer.";
  }

  if (command === "skills") {
    return "React\nNext.js\nTailwind\nNode.js";
  }

  if (command === "projects") {
    return "Terminal Portfolio\nEvent System\nDoctor Platform";
  }

  if (command === "contact") {
    return "email: vedant@email.com";
  }

  if (command === "sudo") {
    if (args[1] === "hire" && args[2] === "vedant") {
      return "Access granted.\nRecruiter notified.";
    }
  }

  if (command === "ls") {
    return "about.txt  contact.txt  projects/";
  }

  if (command === "cd") {
    if (args[1] === "..") {
      setCwd("/home");
      return "";
    }

    if (args[1] === "projects") {
      setCwd("/home/projects");
      return "";
    }
  }

  if (command === "cat") {
    if (args[1] === "about.txt") {
      return "Hi I'm Vedant\nFrontend Developer";
    }

    if (args[1] === "contact.txt") {
      return "Email: vedant@email.com";
    }
  }

  if (command === "time") {
    return new Date().toLocaleString();
  }

  if (command === "whoami") {
    return "vedant";
  }

  if (command === "pwd") {
    return cwd;
  }

  // instead of only string → return object sometimes
  if (command === "qr") {
    const url = args[1];

    if (!url) return "Usage: qr <url>";

    return {
      type: "qr",
      value: url,
    };
  }

  if (command === "coin") {
    const result = Math.random() < 0.5 ? "Heads" : "Tails";

    return `
Flipping coin...

🪙 Result: ${result}
`;
  }

  if (command === "sysinfo") {
    return {
      type: "sysinfo",
    };
  }

  return `command not found: ${cmd}`;
}
