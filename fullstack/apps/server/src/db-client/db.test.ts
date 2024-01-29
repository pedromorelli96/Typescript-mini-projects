import { expect, test, beforeEach } from "vitest";
import { promises as fs } from "fs";
import path from "path";
import { Db } from "$/db-client/db";

const TEST_FILE_PATH = "./store.test.json";
const db = new Db(TEST_FILE_PATH);

async function resetTestFile(): Promise<void> {
  const filePath = path.join(__dirname, TEST_FILE_PATH);
  await fs.writeFile(filePath, JSON.stringify([]));
}

beforeEach(resetTestFile);

test("create", async () => {
  const title = "Test todo";
  const newTodo = await db.create({
    title,
    completed: false,
  });

  expect(newTodo.title).toBe(title);
  expect(newTodo).toHaveProperty("completed", false);
});
