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

  if (command === "poweroff" || command === "shutdown") {
  return {
    type: "poweroff"
  }
}

if (command === "day") {
  return new Date().toLocaleDateString(undefined, { weekday: "long" });
}
if (command === "quote") {
  const quotes = [
    "Code never lies, comments sometimes do.",
    "Stay hungry, stay foolish.",
    "First solve the problem, then write code."
  ];

  return quotes[Math.floor(Math.random() * quotes.length)];
}

if (command === "calendar") {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let output = "Su Mo Tu We Th Fr Sa\n";

  let day = 1;
  let line = "";

  // empty spaces
  for (let i = 0; i < firstDay; i++) {
    line += "   ";
  }

  while (day <= daysInMonth) {
    line += day.toString().padStart(2, " ") + " ";
    if ((firstDay + day) % 7 === 0) {
      output += line + "\n";
      line = "";
    }
    day++;
  }

  if (line) output += line;

  return output;
}

if (command === "age") {

  if (!args[1]) {
    return `
Usage: age <dob>

Examples:
age 07-08-1998
age 1998-08-07
age 7/8/1998
`;
  }

  const inputDate = args[1];

  let parsedDate;

  // Try parsing multiple formats
  if (inputDate.includes("-")) {
    const parts = inputDate.split("-");

    if (parts[0].length === 4) {
      // YYYY-MM-DD
      parsedDate = new Date(inputDate);
    } else {
      // DD-MM-YYYY
      parsedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }
  } else if (inputDate.includes("/")) {
    const parts = inputDate.split("/");
    parsedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  }

  if (!parsedDate || isNaN(parsedDate)) {
    return `❌ Invalid date format

Use:
age DD-MM-YYYY
age YYYY-MM-DD`;
  }

  const today = new Date();

  let age = today.getFullYear() - parsedDate.getFullYear();
  const m = today.getMonth() - parsedDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < parsedDate.getDate())) {
    age--;
  }

  return `🎂 You are ${age} years old`;
}

if (command === "random") {
  return `🎲 Random: ${Math.floor(Math.random() * 100)}`;
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
