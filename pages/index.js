import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [startupInput, setStartupInput] = useState("");
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startup: startupInput,
        openaiApiKey: openaiApiKey,
      }),
    });
    const data = await response.json();
    setResult(data.result);
    setStartupInput("");
  }

  return (
    <div>
      <Head>
        <title>Startup Name Generator | OpenAI</title>
        <link rel="icon" href="/ghost.png" />
      </Head>

      <main className={styles.main}>
        <img src="/ghost.png" className={styles.icon} />
        <h3>Genz startup name genarator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="startup"
            placeholder="Enter a startup domain"
            value={startupInput}
            onChange={(f) => setStartupInput(f.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
      <footer className={styles.footer}>
        Made By S G Revan Bairav
      </footer>
      <footer className={styles.footer}>
         Inspired from <a href="https://alisolanki.com">Ali Solanki</a>
      </footer>
    </div>
  );
}
