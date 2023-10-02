import { useEffect, useRef, useState } from "react";
import "../styles.css";

function CommandInput() {
  const [currCmd, setCurrCmd] = useState("");
  const [output, setOutput] = useState([
    "Last login: " + Date(),
    "type 'help' for more info",
  ]);
  const input = useRef();
  const fileSystem = {
    name: "/",
    dir: [
      { name: "music", dir: [] },
      { name: "programming" },
      { name: "resume" },
    ],
  };
  const [workingDir, setWorkingDir] = useState("/");

  useEffect(() => {
    processCmd("neofetch");
  }, []);

  useEffect(() => {
    if (currCmd.includes("\n")) {
      setCurrCmd("");
    }
  });

  function processCmd(cmd) {
    if (cmd == "help") {
      setOutput([
        ...output,
        "help page:",
        "\tneofetch - fetch information about this user",
        "\tls - list directory",
        "\tcd - change directory (usage 'cd directory_name')",
      ]);
    } else if (cmd == "neofetch") {
      let asciiName = `
                   88 88                                             
                   "" 88                                             
                      88                                             
88,dPYba,,adPYba,  88 88  ,adPPYba, ,adPPYba, ,adPPYYba,  ,adPPYba,  ,adPPYb,d8 
88P'   "88"    "8a 88 88 a8P_____88 I8[    "" ""     'Y8 a8"     ""  a8"    'Y88
88      88      88 88 88 8PP"""""""  '"Y8ba,  ,adPPPPP88 8b          8b       88
88      88      88 88 88 "8b,   ,aa aa    ]8I 88,    ,88 "8a,   ,aa  "8a    ,d88
88      88      88 88 88  '"Ybbd8"' '"YbbdP"' '"8bbdP"Y8  '"Ybbd8"'  '"YbbdP' 88 
                                                                              88
                                                                              88`;
      let version = <p>version 5.66.9</p>;
      let aboutMe = (
        <p>
          miles acquaviva is a soon-to-be graduate of{" "}
          <a href="https://rutgers.edu">Rutgers University</a> studying music
          education and computer science. <br />
          on the tech side, i specialize in software engineering working with{" "}
          <a href="https://www.typescriptlang.org/">TypeScript</a>,{" "}
          <a href="https://developer.apple.com/swift/">Swift</a>,{" "}
          <a href="https://www.oracle.com/java/">Java</a> and{" "}
          <a href="https://en.wikipedia.org/wiki/C_(programming_language)">C</a>{" "}
          most often. <br />
          some of my favorite projects are:
          <br />
          <a href="https://github.com/link5669/Atonal-Aleatoric-Generator">
            this
          </a>{" "}
          program that generates music in the style of twentieth century
          aleatoric composers, <br />
          <a href="https://github.com/link5669/quizgpt">this</a> web-app that
          uses AI to test your knowledge on any topic imaginable,
          <br />
          and <a href="https://github.com/link5669/circles">this</a>, an
          in-progress social media app that uses NFC to guarantee real-life
          connections
        </p>
      );
      setOutput([...output, "neofetch", asciiName, version, aboutMe]);
    } else if (cmd == "ls") {
      setOutput([...output, "ls"]);
      if (workingDir == "/") {
        let dirs = [];
        for (let i = 0; i < fileSystem.dir.length; i++) {
          dirs.push(fileSystem.dir[i].name);
        }
        setOutput([...output, dirs.map((a) => a + "\n")]);
      }
    } else if (cmd.includes("cd")) {
      const dir = cmd.split(" ")[1];
      for (let i = 0; i < fileSystem.dir.length; i++) {
        if (dir == fileSystem.dir[i].name) {
          console.log(dir, fileSystem.dir[i].name);
          setWorkingDir(workingDir + dir);
        }
      }
      if (dir == "..") {
        let splitDir = workingDir.split("/");
        let newDir = "/"+splitDir.slice(0, splitDir.length - 2).join("/");
        setWorkingDir(newDir);
      }
    } else if (cmd == "pwd") {
      setOutput([...output, workingDir]);
    } else {
      setOutput([...output, ""]);
    }
  }

  const processChange = (e) => {
    console.log(e.key);
    if (e.key == "Enter") {
      processCmd(currCmd);
      setCurrCmd("");
      e.target.value = "";
    }
  };

  const inputChange = (e) => {
    setCurrCmd(e.target.value);
  };

  return (
    <div class="wrapper">
      <div class="ui">
        {output.map((cmd, index) => {
          return (
            <>
              <pre
                key={index}
                style={{ color: "#8C93A8", fontFamily: "monospace" }}
              >
                {cmd}
              </pre>
            </>
          );
        })}
        <p style={{ display: "inline-block" }}>
          milesacq@milesacq.com~ {workingDir} %{" "}
        </p>
        <input
          onChange={inputChange}
          onKeyDown={processChange}
          ref={input}
          autoFocus
        />
      </div>
    </div>
  );
}

export default CommandInput;
