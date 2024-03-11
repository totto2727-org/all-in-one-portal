export async function main() {
  console.log("This will print once a hour.")
}

if (import.meta.main) {
  await main()
}
